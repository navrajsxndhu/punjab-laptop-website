const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '../frontend/src/app/admin');

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Replace bg-white on containers
            content = content.replace(/bg-white shadow-soft border border-gray-100/g, 'bg-surface/50 backdrop-blur-md shadow-soft border border-white/10');
            content = content.replace(/bg-white rounded-\[20px\] shadow-2xl/g, 'bg-surface border border-white/10 rounded-[20px] shadow-2xl');
            
            // Table borders and rows
            content = content.replace(/border-gray-100/g, 'border-white/10');
            content = content.replace(/border-gray-50 hover:bg-gray-50\/50/g, 'border-white/5 hover:bg-white/5');
            content = content.replace(/hover:bg-gray-50\/50/g, 'hover:bg-white/5');
            
            // Modals and side drawers
            content = content.replace(/max-w-md bg-white/g, 'max-w-md bg-surface border-l border-white/10');
            content = content.replace(/max-w-lg bg-white/g, 'max-w-lg bg-surface border-l border-white/10');
            content = content.replace(/bg-white z-50/g, 'bg-surface z-50');
            
            // Inputs
            content = content.replace(/className="input-field"/g, 'className="input-field bg-white/5 border-white/10 text-text-primary"');
            
            // Text colors
            content = content.replace(/text-gray-900/g, 'text-text-primary');
            content = content.replace(/text-gray-800/g, 'text-text-primary');
            content = content.replace(/text-gray-500/g, 'text-text-muted');
            
            // Inquiries page specific
            content = content.replace(/'bg-white text-text-muted border border-gray-200'/g, "'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'");
            content = content.replace(/'bg-white border-gray-100 shadow-soft'/g, "'bg-surface/50 border-white/10 shadow-soft'");
            
            // Offers page specific
            content = content.replace(/'bg-white\/20 text-white\/70'/g, "'bg-white/10 text-text-muted'");
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    });
}

traverse(adminDir);
console.log('Done');
