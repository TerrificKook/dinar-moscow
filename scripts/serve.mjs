import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../public/', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.jpeg':'image/jpeg', '.webp':'image/webp', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.split('/').some(p => p.startsWith('.'))) throw new Error('blocked');
    const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root)) throw new Error('blocked');
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'X-Robots-Tag':'noindex, nofollow'});
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.on('error', e => { console.error(e.code === 'EADDRINUSE' ? 'Порт занят. Укажите другой: node scripts/serve.mjs 4188' : e.message); process.exitCode = 1; });
server.listen(Number(process.argv[2] || 4173), '127.0.0.1', () => console.log(`Сайт: http://127.0.0.1:${server.address().port}`));
