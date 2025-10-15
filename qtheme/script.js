(() => {
  const state = {
    searchId: null,
    pollingTimer: null,
    isSearching: false
  };

  const dom = {};

  function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = options.html;
    if (options.attrs) {
      Object.entries(options.attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
      });
    }
    return el;
  }

  function ensureToastContainer() {
    if (dom.toast) return;
    dom.toast = createElement("div", { className: "toast" });
    document.body.appendChild(dom.toast);
  }

  function showToast(message, type = "success") {
    ensureToastContainer();
    dom.toast.textContent = message;
    dom.toast.classList.remove("error");
    if (type === "error") dom.toast.classList.add("error");
    dom.toast.classList.add("show");
    setTimeout(() => {
      dom.toast.classList.remove("show");
    }, 2800);
  }

  function createSearchOverlay() {
    if (dom.searchOverlay) return;
    dom.searchOverlay = createElement("div", { id: "searchOverlay" });

    const header = createElement("header");
    const title = createElement("h2", { text: "Search Torrents" });
    const closeBtn = createElement("button", { text: "Close" });
    closeBtn.addEventListener("click", () => toggleSearchOverlay(false));
    header.appendChild(title);
    header.appendChild(closeBtn);

    const inputGroup = createElement("div", { className: "search-input-group" });
    dom.searchInput = createElement("input", {
      attrs: {
        type: "search",
        placeholder: "Search e.g. \"Ubuntu LTS\"",
        autocomplete: "off"
      }
    });
    const submitBtn = createElement("button", { text: "Search" });
    submitBtn.addEventListener("click", handleSearchSubmit);
    dom.searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearchSubmit();
      }
    });
    inputGroup.appendChild(dom.searchInput);
    inputGroup.appendChild(submitBtn);

    dom.statusLabel = createElement("div", { className: "search-status", text: "" });
    dom.searchList = createElement("div", { className: "search-list" });

    dom.searchOverlay.appendChild(header);
    dom.searchOverlay.appendChild(inputGroup);
    dom.searchOverlay.appendChild(dom.statusLabel);
    dom.searchOverlay.appendChild(dom.searchList);
    document.body.appendChild(dom.searchOverlay);
  }

  function createMobileActionBar() {
    if (dom.actionBar) return;
    dom.actionBar = createElement("div", { id: "mobileActionBar" });

    const refreshButton = createElement("button", { text: "Refresh" });
    refreshButton.addEventListener("click", () => {
      if (window.transferList && typeof window.transferList.refresh === "function") {
        window.transferList.refresh();
        showToast("Transfer list refreshed");
      } else {
        window.location.reload();
      }
    });

    const searchButton = createElement("button", { text: "Search" });
    searchButton.addEventListener("click", () => toggleSearchOverlay(true));

    const desktopToggle = createElement("button", { text: "Desktop UI" });
    desktopToggle.addEventListener("click", () => {
      document.body.classList.toggle("mobile-compact");
      const isCompact = document.body.classList.contains("mobile-compact");
      showToast(isCompact ? "Compact mode enabled" : "Compact mode disabled");
    });

    dom.actionBar.appendChild(refreshButton);
    dom.actionBar.appendChild(searchButton);
    dom.actionBar.appendChild(desktopToggle);
    document.body.appendChild(dom.actionBar);
  }

  function toggleSearchOverlay(visible) {
    createSearchOverlay();
    if (visible) {
      dom.searchOverlay.classList.add("active");
      setTimeout(() => dom.searchInput?.focus(), 80);
    } else {
      dom.searchOverlay.classList.remove("active");
      stopPolling();
      dom.statusLabel.textContent = "";
      dom.searchList.innerHTML = "";
      state.searchId = null;
      state.isSearching = false;
    }
  }

  function stopPolling() {
    if (state.pollingTimer) {
      clearTimeout(state.pollingTimer);
      state.pollingTimer = null;
    }
  }

  async function handleSearchSubmit() {
    if (!dom.searchInput) return;
    const query = dom.searchInput.value.trim();
    if (!query) {
      showToast("Type something to search", "error");
      return;
    }
    if (state.isSearching) {
      showToast("Search already running", "error");
      return;
    }

    dom.statusLabel.textContent = "Starting search…";
    dom.searchList.innerHTML = "";
    state.isSearching = true;
    try {
      const id = await startSearch(query);
      state.searchId = id;
      pollSearch(id);
    } catch (error) {
      console.error(error);
      dom.statusLabel.textContent = "Unable to start search.";
      showToast("Search failed to start", "error");
      state.isSearching = false;
    }
  }

  async function startSearch(pattern) {
    const params = new URLSearchParams();
    params.append("pattern", pattern);
    params.append("plugins", "enabled");
    params.append("category", "all");

    const response = await fetch("/api/v2/search/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params.toString()
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Search start failed: ${response.status} ${text}`);
    }

    const payload = await response.json();
    if (!payload || typeof payload.id !== "number") {
      throw new Error("Search start response missing id");
    }

    return payload.id;
  }

  async function pollSearch(id) {
    try {
      const response = await fetch(`/api/v2/search/status?id=${encodeURIComponent(id)}`);
      if (!response.ok) {
        throw new Error(`Search status failed: ${response.status}`);
      }
      const payload = await response.json();
      const status = payload?.status?.find((item) => item.id === id);
      if (status) {
        dom.statusLabel.textContent = `${status.status} • Found ${status.total ?? status.found ?? 0} results`;
      }
      if (Array.isArray(payload?.results)) {
        renderResults(payload.results);
      }

      const finished = status && (status.status === "Stopped" || status.status === "Finished");
      if (finished) {
        state.isSearching = false;
        showToast("Search completed");
      } else {
        state.pollingTimer = setTimeout(() => pollSearch(id), 1500);
      }
    } catch (error) {
      console.error(error);
      showToast("Search polling failed", "error");
      state.isSearching = false;
    }
  }

  function renderResults(results) {
    if (!dom.searchList) return;
    dom.searchList.innerHTML = "";
    if (!results.length) {
      const empty = createElement("div", {
        className: "search-item",
        text: "No results yet – still searching."
      });
      dom.searchList.appendChild(empty);
      return;
    }

    results.forEach((result) => {
      const item = createElement("div", { className: "search-item" });
      const title = createElement("h3", { text: result.fileName || "Unnamed torrent" });
      item.appendChild(title);

      const meta = createElement("div", { className: "meta" });
      if (result.fileSize) meta.appendChild(createElement("span", { text: formatBytes(result.fileSize) }));
      if (Number.isInteger(result.seeds)) meta.appendChild(createElement("span", { text: `S:${result.seeds}` }));
      if (Number.isInteger(result.leechs)) meta.appendChild(createElement("span", { text: `L:${result.leechs}` }));
      if (result.engine_url) {
        const engine = createElement("span", { text: new URL(result.engine_url).hostname });
        meta.appendChild(engine);
      }
      item.appendChild(meta);

      const actions = createElement("div", { className: "actions" });
      const openBtn = createElement("button", { text: "Open" });
      openBtn.addEventListener("click", () => {
        window.open(result.descrLink || result.site_url || result.engine_url || result.download_url, "_blank");
      });

      const addBtn = createElement("button", { text: "Add" });
      addBtn.addEventListener("click", async () => {
        try {
          await addTorrent(result.magnet_uri || result.url || result.download_url);
          showToast("Added to qBittorrent");
        } catch (error) {
          console.error(error);
          showToast("Unable to add torrent", "error");
        }
      });
      actions.appendChild(openBtn);
      actions.appendChild(addBtn);
      item.appendChild(actions);

      dom.searchList.appendChild(item);
    });
  }

  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return "";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, index);
    return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[index]}`;
  }

  async function addTorrent(url) {
    if (!url) throw new Error("Missing torrent URL");
    const params = new URLSearchParams();
    params.append("urls", url);
    const response = await fetch("/api/v2/torrents/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params.toString()
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Add torrent failed: ${response.status} ${text}`);
    }
  }

  function waitForDom() {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      initialize();
    } else {
      document.addEventListener("DOMContentLoaded", initialize, { once: true });
    }
  }

  function initialize() {
    createMobileActionBar();
    createSearchOverlay();
    document.body.classList.add("mobile-compact");

    window.addEventListener("beforeunload", () => {
      stopPolling();
      if (state.searchId !== null) {
        fetch(`/api/v2/search/stop?id=${encodeURIComponent(state.searchId)}`, { method: "POST" }).catch(() => {});
      }
    });
  }

  waitForDom();
})();
