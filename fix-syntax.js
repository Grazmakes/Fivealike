const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing malformed syntax patterns...');

// Fix pattern: saves: number\n  ,\n    isRejected: false}
content = content.replace(/(\s+saves:\s*\d+)\s*\n\s*,\s*\n\s*(isRejected:\s*false)\s*\}/g, '$1,\n    $2\n  }');

// Fix any remaining pattern with malformed comma placement
content = content.replace(/(\w+:\s*[^,\n}]+)\s*\n\s*,\s*\n\s*(isRejected:\s*false)\s*\}/g, '$1,\n    $2\n  }');

console.log('✅ Fixed malformed syntax patterns');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated!');