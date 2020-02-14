const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://members.actorsequity.org/signin/?returnurl=%2F');
    await page.type('#Username', 'Slonergan');
    await page.keyboard.press('Tab');
    await page.keyboard.type('password');
    await page.click('#submit-signin-local')
    await page.screenshot({path: 'example.png'});

    await browser.close();
})();
