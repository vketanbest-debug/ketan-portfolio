import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
const projectEntries=Object.fromEntries(readdirSync('work',{withFileTypes:true}).filter(entry=>entry.isDirectory()).map(entry=>[entry.name,resolve(`work/${entry.name}/index.html`)]));
export default defineConfig({build:{rollupOptions:{input:{home:resolve('index.html'),...projectEntries}}}});
