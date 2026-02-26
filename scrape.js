const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [34,35,36,37,38,39,40,41,42,43];

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url);

    // 🔴 CRITICAL: wait for JS to render table
    await page.waitForSelector("table");

    // Extract numbers from table cells
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(c => Number(c.innerText))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a + b, 0);

    console.log(`Seed ${seed} sum =`, pageSum);

    totalSum += pageSum;
  }

  console.log("TOTAL_SUM =", totalSum);

  await browser.close();
})();