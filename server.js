const http = require('http');
const WebSocket = require('ws');
const { chromium } = require('playwright');

const server = http.createServer(); // ← 重要！
const wss = new WebSocket.Server({ server }); // ← HTTPと統合

wss.on('connection', async (ws) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  ws.on('message', async (msg) => {
    const command = msg.toString();

    if (command === 'screenshot') {
      await page.goto('https://example.com');
      const buf = await page.screenshot();
      ws.send(buf);
    } else {
      ws.send(`Unknown command: ${command}`);
    }
  });

  ws.on('close', async () => {
    await browser.close();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on ws://localhost:${PORT}`);
});
