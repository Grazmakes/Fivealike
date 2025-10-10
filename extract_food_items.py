import re

with open('src/data/comprehensiveTestData.ts', 'r') as f:
    content = f.read()

# Find all Food category sections
food_pattern = r"category: ['\"]Food['\"].*?items: \[([^\]]+)\]"
matches = re.findall(food_pattern, content, re.DOTALL)

all_items = set()
for match in matches:
    # Extract items from the array
    items = re.findall(r"['\"]([^'\"]+)['\"]", match)
    all_items.update(items)

# Sort and print
for item in sorted(all_items):
    print(item)
