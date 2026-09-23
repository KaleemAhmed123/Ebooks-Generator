import fs from 'fs';
import path from 'path';

const sups = { '0':'⁰', '1':'¹', '2':'²', '3':'³', '4':'⁴', '5':'⁵', '6':'⁶', '7':'⁷', '8':'⁸', '9':'⁹', 'n':'ⁿ', '+':'⁺', '-':'⁻', '/':'/' };
const subs = { '0':'₀', '1':'₁', '2':'₂', '3':'₃', '4':'₄', '5':'₅', '6':'₆', '7':'₇', '8':'₈', '9':'₉' };

function toSup(str) { return str.split('').map(c => sups[c] || c).join(''); }
function toSub(str) { return str.split('').map(c => subs[c] || c).join(''); }

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.md')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/hp/Desktop/Projects-Root/Ebook Management/books/tech/DSA');
let count = 0;
let fileCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/\$([^$\n]+)\$/g, (match, inner) => {
    let s = inner;
    s = s.replace(/\\log_([A-Za-z0-9])/g, (m, p) => `log${toSub(p)}`);
    s = s.replace(/\\log/g, 'log');
    s = s.replace(/\\cdot/g, '·');
    s = s.replace(/\\ge/g, '≥');
    s = s.replace(/\\le/g, '≤');
    s = s.replace(/\\sqrt\{([^}]+)\}/g, '√$1');
    s = s.replace(/\\sqrt ([^\s]+)/g, '√$1');
    s = s.replace(/\\equiv/g, '≡');
    s = s.replace(/\\approx/g, '≈');
    s = s.replace(/\\neq/g, '≠');
    
    // Fix fractions if any
    s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');

    // Superscripts
    s = s.replace(/\^([0-9n])/g, (m, p) => sups[p]);
    s = s.replace(/\^\{([^}]+)\}/g, (m, p) => toSup(p));
    
    // Subscripts
    s = s.replace(/_([0-9n])/g, (m, p) => subs[p] || p);
    s = s.replace(/_\{([^}]+)\}/g, (m, p) => toSub(p));
    
    // Backslash spaces
    s = s.replace(/\\ /g, ' ');
    // Strip other stray slashes
    s = s.replace(/\\/g, '');
    
    count++;
    return s;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    fileCount++;
  }
});

console.log(`Replaced ${count} math blocks across ${fileCount} files.`);
