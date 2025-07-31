const { chromium } = require('playwright');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port });

console.log(`WebSocket server listening on port ${port}`);

wss.on('connection', async (ws) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  ws.on('message', async (msg) => {
    const command = msg.toString();

    if (command === 'screenshot') {
      await page.goto('https://example.com');
      const buf = await page.screenshot();
      ws.send(buf); // Send screenshot as binary
    } else {
      ws.send(`Unknown command: ${command}`);
    }
  });

  ws.on('close', async () => {
    await browser.close();
  });
});
