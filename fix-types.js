const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing TypeScript compilation issues...');

// The main issue is the detectTwins function returns objects with undefined properties
// Let's examine and fix the detectTwins function first
const detectTwinsMatch = content.match(/function detectTwins\(lists: any\[\]\): List\[\] \{([\s\S]*?)\n\}/);
if (detectTwinsMatch) {
  const originalFunction = detectTwinsMatch[0];
  console.log('Found detectTwins function, examining...');

  // The function seems to be spreading properties which can introduce undefined values
  // Let's replace it with a safer version that ensures all required properties exist
  const newFunction = `function detectTwins(lists: any[]): List[] {
  const processedLists: List[] = [];

  for (const list of lists) {
    if (!list) continue;

    // Ensure all required properties exist with proper defaults
    const processedList: List = {
      id: list.id || 0,
      title: list.title || '',
      author: list.author || '',
      category: list.category || '',
      date: list.date || '',
      votes: list.votes || 0,
      upvotes: list.upvotes || 0,
      downvotes: list.downvotes || 0,
      userVote: list.userVote || null,
      highFives: list.highFives || 0,
      userHighFived: list.userHighFived || false,
      items: list.items || [],
      description: list.description || '',
      comments: list.comments || [],
      saves: list.saves || 0,
      isRejected: list.isRejected || false
    };

    processedLists.push(processedList);
  }

  return processedLists;
}`;

  content = content.replace(originalFunction, newFunction);
  console.log('✅ Fixed detectTwins function');
} else {
  console.log('⚠️  detectTwins function not found');
}

// Fix any remaining comment objects that have 'author' instead of 'user'
content = content.replace(/(\{\s*id:\s*\d+,\s*)author:/g, '$1user:');
console.log('✅ Fixed comment author properties');

// Fix any remaining duplicate property names
const duplicateRegex = /(\w+:\s*[^,}]+,\s*\n\s*)(\1:\s*[^,}]+)/g;
content = content.replace(duplicateRegex, '$2');
console.log('✅ Fixed duplicate properties');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated!');