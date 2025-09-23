import { List } from '@/types';

export const exportToPDF = (list: List) => {
  // Create a compact, single-page PDF layout
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${list.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.4;
            color: #374151;
            background: white;
            padding: 20px;
            font-size: 14px;
          }
          
          .container {
            max-width: 750px;
            margin: 0 auto;
          }
          
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 16px;
          }
          
          .logo {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .tagline {
            font-size: 11px;
            opacity: 0.9;
            margin-bottom: 12px;
          }
          
          h1 { 
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          
          .list-type-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .meta {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 16px;
            padding: 12px;
            background: #f9fafb;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
          }
          
          .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
          }
          
          .meta-icon {
            width: 16px;
            height: 16px;
            background: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            flex-shrink: 0;
          }
          
          .meta-label {
            font-weight: 500;
            color: #6b7280;
            margin-right: 4px;
          }
          
          .meta-value {
            font-weight: 600;
            color: #1f2937;
          }
          
          .description {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
            font-size: 13px;
            line-height: 1.4;
          }
          
          .description-title {
            font-weight: 600;
            color: #7c3aed;
            margin-bottom: 6px;
            font-size: 13px;
          }
          
          .recommendations-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .recommendations-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .items {
            list-style: none;
            counter-reset: item-counter;
            margin-bottom: 16px;
          }
          
          .item {
            background: white;
            margin: 8px 0;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            position: relative;
            counter-increment: item-counter;
            display: flex;
            align-items: center;
          }
          
          /* Regular list styling */
          .item.regular::before {
            content: counter(item-counter);
            width: 20px;
            height: 20px;
            background: #6b7280;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          /* Ranked list styling */
          .item.ranked::before {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: white;
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          .item.ranked.rank-1::before {
            content: '🥇';
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          }
          
          .item.ranked.rank-2::before {
            content: '🥈';
            background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          }
          
          .item.ranked.rank-3::before {
            content: '🥉';
            background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          }
          
          .item.ranked.rank-4::before,
          .item.ranked.rank-5::before {
            content: counter(item-counter);
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          }
          
          .item-content {
            font-size: 14px;
            font-weight: 500;
            color: #1f2937;
            flex: 1;
          }
          
          .footer {
            background: #f9fafb;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            color: #6b7280;
            font-size: 11px;
          }
          
          .footer-brand {
            font-weight: 600;
            color: #3b82f6;
          }
          
          @media print {
            body { padding: 15px; }
            @page { margin: 0.5in; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Five Alike</div>
            <div class="tagline">find a list for just about anything</div>
            <h1>${list.title}</h1>
            ${list.isOrdered ? 
              '<div class="list-type-badge">📊 Ranked List</div>' : 
              '<div class="list-type-badge">📝 Collection</div>'
            }
          </div>
          
          <div class="meta">
            <div class="meta-item">
              <div class="meta-icon">👤</div>
              <span class="meta-label">By:</span>
              <span class="meta-value">${list.author}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">📁</div>
              <span class="meta-label">Category:</span>
              <span class="meta-value">${list.category}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">📅</div>
              <span class="meta-label">Date:</span>
              <span class="meta-value">${new Date(list.date).toLocaleDateString()}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">⭐</div>
              <span class="meta-label">Votes:</span>
              <span class="meta-value">${list.upvotes} • ${list.highFives} high fives</span>
            </div>
          </div>
          
          ${list.description ? `
            <div class="description">
              <div class="description-title">About this list</div>
              <div>${list.description}</div>
            </div>
          ` : ''}
          
          <div class="recommendations-header">
            <div class="recommendations-title">
              ${list.isOrdered ? '🏆 Rankings' : '📋 Recommendations'}
            </div>
          </div>
          
          <ol class="items">
            ${list.items.map((item, index) => `
              <li class="item ${list.isOrdered ? `ranked rank-${index + 1}` : 'regular'}">
                <div class="item-content">${item}</div>
              </li>
            `).join('')}
          </ol>
          
          <div class="footer">
            Exported from <span class="footer-brand">Five Alike</span> • ${new Date().toLocaleDateString()}
          </div>
        </div>
      </body>
    </html>
  `;
  
  // Open in new window for printing/saving as PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};

export const exportToCSV = (list: List) => {
  const csvContent = [
    ['Title', 'Author', 'Category', 'Date', 'Description', 'List Type', 'Rank/Position', 'Recommendation'],
    ...list.items.map((item, index) => [
      list.title,
      list.author, 
      list.category,
      new Date(list.date).toLocaleDateString(),
      list.description.replace(/,/g, ';'), // Replace commas to avoid CSV issues
      list.isOrdered ? 'Ranked List' : 'Collection',
      list.isOrdered && index < 3 ? ['🥇 1st', '🥈 2nd', '🥉 3rd'][index] : (index + 1).toString(),
      item.replace(/,/g, ';')
    ])
  ];

  const csvString = csvContent.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
  
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${list.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToText = (list: List) => {
  const textContent = `
${list.title}
${'='.repeat(list.title.length)}

By: ${list.author}
Category: ${list.category}
Created: ${new Date(list.date).toLocaleDateString()}
Votes: ${list.upvotes} | High Fives: ${list.highFives}
${list.isOrdered ? 'Type: Ranked List' : 'Type: Collection'}

${list.description ? `Description:\n${list.description}\n\n` : ''}${list.isOrdered ? 'Rankings:' : 'Recommendations:'}
${list.items.map((item, index) => {
  if (list.isOrdered) {
    if (index === 0) return `🥇 1. ${item}`;
    if (index === 1) return `🥈 2. ${item}`;
    if (index === 2) return `🥉 3. ${item}`;
    return `   ${index + 1}. ${item}`;
  }
  return `${index + 1}. ${item}`;
}).join('\n')}

---
Exported from Five Alike on ${new Date().toLocaleDateString()}
  `.trim();
  
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${list.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};