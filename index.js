const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://members.actorsequity.org/signin/?returnurl=%2F');
    await page.keyboard.type('Slonergan');
    await page.keyboard.press('Tab');
    await page.mouse.click(720, 720);
    await page.screenshot({path: 'example.png'});

    await browser.close();
})();
