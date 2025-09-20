import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun' 
import path from "path";
import api from '@/api';


import "@services/firebase";

const PORT = Bun.env.PORT || 3000;
const DIST = path.join(__dirname, "..", "dist");
const INDEX_PATH = path.join(__dirname, "..", "dist", "index.html")
const HTML = await Bun.file(INDEX_PATH).text()

const app = new Hono();

// Middlewares
app.use('*', logger());
app.use('*', cors({
    origin: '*',
}))

// Routes
app.route('/api', api);

app.use('/*', serveStatic({ 
    root: DIST
    })
);

app.get('*', c => {
    return c.html(HTML);
});

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`✅ Server listening at http://localhost:${PORT}`);