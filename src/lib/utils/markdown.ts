import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMarkdownData(filePath: string) {
  const fullPath = path.join(process.cwd(), 'src', 'content', filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}