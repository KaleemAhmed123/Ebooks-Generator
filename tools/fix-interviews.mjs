import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dirs = [
  '01-foundations',
  '02-pattern-recognition',
  '03-data-structures',
  '04-algorithms',
  '05-graphs',
  '06-dynamic-programming',
  '07-problem-solving-and-interviews',
  '08-competitive-track'
];

async function processFile(filePath) {
  let content = await readFile(filePath, 'utf8');
  let changed = false;

  // Remove first line if it's an h1 like "# Module 1" or "# Chapter 1"
  if (content.match(/^#\s+(?:Module|Chapter)\s+\d+.*?\r?\n\r?\n/)) {
    content = content.replace(/^#\s+(?:Module|Chapter)\s+\d+.*?\r?\n\r?\n/, '');
    changed = true;
  }
  if (content.match(/^#\s+(?:Module|Chapter)\s+\d+.*?\r?\n/)) {
    content = content.replace(/^#\s+(?:Module|Chapter)\s+\d+.*?\r?\n/, '');
    changed = true;
  }

  // Fix :::interview blocks
  const interviewRegex = /(:::interview\r?\n)([\s\S]*?)(:::)/g;
  content = content.replace(interviewRegex, (match, open, body, close) => {
    // Replace quotes and dash: "Question" - Answer -> "Question"\n\nAnswer
    let newBody = body.replace(/^("[^"]+")\s*(?:—|-)\s*(.*)$/gm, (m, q, a) => {
      return `${q}\n\n${a}`;
    });
    // some might not have quotes around the question
    newBody = newBody.replace(/^([^"]+?\?)\s*(?:—|-)\s*(.*)$/gm, (m, q, a) => {
      return `"${q}"\n\n${a}`;
    });

    if (newBody !== body) {
      changed = true;
    }
    return `${open}${newBody}${close}`;
  });

  if (changed) {
    await writeFile(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

async function run() {
  for (const dir of dirs) {
    const pagesDir = join('books/tech/DSA', dir, 'pages');
    try {
      const files = await readdir(pagesDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          await processFile(join(pagesDir, file));
        }
      }
    } catch (e) {
      // Ignore if dir doesn't exist or no pages
    }
  }
}

run().catch(console.error);
