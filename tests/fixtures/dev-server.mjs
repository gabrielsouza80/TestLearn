// Native Node process: isolate Vite's config loader from Playwright's TS loader.
import { createServer } from 'vite';
import process from 'node:process';
import { createServer as createTCPServer } from 'node:net';
let server;
process.on('disconnect', () => process.exit(0));
const freePort = () =>
  new Promise((resolve, reject) => {
    const probe = createTCPServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const port = probe.address().port;
      probe.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
const start = async (port) => {
  const next = await createServer({
    cacheDir: process.argv[2],
    server: { host: '127.0.0.1', port, strictPort: true },
  });
  await next.listen();
  // A listening socket alone does not mean a fresh optimizer cache is ready.
  await next.warmupRequest('/src/main.tsx');
  await next.waitForRequestsIdle();
  await next.environments.client.depsOptimizer?.scanProcessing;
  await Promise.all(
    next.environments.client.depsOptimizer?.metadata.depInfoList.map(
      (dependency) => dependency.processing,
    ) ?? [],
  );
  return next;
};
const reportError = (error) => {
  process.send?.({ event: 'error', message: String(error) });
};
process.on('message', async ({ action }) => {
  try {
    if (action === 'hmr') {
      const module = await server.moduleGraph.getModuleByUrl('/src/App.tsx');
      if (!module) throw new Error('App module has not loaded');
      server.moduleGraph.invalidateModule(module);
      server.ws.send({
        type: 'update',
        updates: [
          {
            type: 'js-update',
            path: '/src/App.tsx',
            acceptedPath: '/src/App.tsx',
            timestamp: Date.now(),
          },
        ],
      });
      process.send?.({ event: 'hmr' });
    } else if (action === 'restart') {
      const port = server.httpServer.address().port;
      await server.close();
      server = await start(port);
      process.send?.({ event: 'restarted' });
    }
  } catch (error) {
    reportError(error);
  }
});
try {
  server = await start(await freePort());
  process.send?.({ event: 'ready', port: server.httpServer.address().port });
} catch (error) {
  reportError(error);
}
