const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing detectTwins function and duplicate properties...');

// Fix the duplicate avatar properties in comment templates (lines 296-303)
const commentTemplateFixRegex = /{ user: '([^']+)', content: '([^']*)', avatar: '[^']*' , time: '([^']+)', avatar: '([^']+)' }/g;
content = content.replace(commentTemplateFixRegex, "{ user: '$1', content: '$2', time: '$3', avatar: '$4' }");
console.log('✅ Fixed duplicate avatar properties in comment templates');

// Fix the detectTwins function to not add properties that don't exist in the List interface
const detectTwinsFunction = `const detectTwins = (lists: List[]): List[] => {
  const hashMap = new Map<string, List[]>();

  // Group lists by their hash
  lists.forEach(list => {
    const hash = generateListHash(list.title, list.items);
    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash)!.push(list);
  });

  // Note: We're removing the twin marking code since List interface doesn't include twins/twinCount
  // The original functionality can be restored if the interface is updated

  return lists;
};`;

// Replace the detectTwins function
const detectTwinsFunctionRegex = /const detectTwins = \(lists: List\[\]\): List\[\] => \{[\s\S]*?\n\};/;
content = content.replace(detectTwinsFunctionRegex, detectTwinsFunction);
console.log('✅ Fixed detectTwins function to not add non-existent properties');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated!');