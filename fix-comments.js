const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing comment objects with invalid properties...');

// Fix comment objects that have properties not in the Comment interface
// Remove properties like timestamp, likes, userLiked, replies, etc.
// Keep only: id, user, content, time, avatar

// Pattern for comment objects with invalid properties
const invalidCommentRegex = /\{\s*id:\s*\d+,\s*user:\s*'[^']*',\s*content:\s*'[^']*',\s*(timestamp|likes|userLiked|avatar|replies):[^}]*\}/g;

// Find all invalid comment patterns and fix them
let matches = content.match(invalidCommentRegex);
if (matches) {
  console.log(`Found ${matches.length} invalid comment objects`);

  // Replace each invalid comment with a valid one
  for (const match of matches) {
    console.log('Fixing comment:', match.substring(0, 50) + '...');

    // Extract the basic properties we need
    const idMatch = match.match(/id:\s*(\d+)/);
    const userMatch = match.match(/user:\s*'([^']*)'/);
    const contentMatch = match.match(/content:\s*'([^']*)'/);

    if (idMatch && userMatch && contentMatch) {
      const newComment = `{
        id: ${idMatch[1]},
        user: '${userMatch[1]}',
        content: '${contentMatch[1]}',
        time: '1 hour ago',
        avatar: '👤'
      }`;

      content = content.replace(match, newComment);
    }
  }
} else {
  console.log('No invalid comment objects found with that pattern');
}

// Also fix any remaining timestamp properties
content = content.replace(/timestamp:/g, 'time:');
content = content.replace(/likes:/g, '// likes:');
content = content.replace(/userLiked:/g, '// userLiked:');
content = content.replace(/replies:/g, '// replies:');

console.log('✅ Fixed invalid comment properties');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated!');