const { chromium } = require('playwright');
const { createServer } = require('@playwright/test/mcp');

(async () => {
  const server = await createServer({ browserName: 'chromium' });
  server.listen(3000, () => {
    console.log('MCP server listening on http://localhost:3000');
  });
})();
