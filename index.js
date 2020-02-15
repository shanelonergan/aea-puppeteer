const puppeteer = require('puppeteer');
require('dotenv').config();

 const signup = async () => {
    const audition = 'Cape May Stage 2020 Season'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://members.actorsequity.org/signin/?returnurl=%2F');
    await page.type('#Username', 'Slonergan');
    await page.keyboard.press('Tab');
    await page.keyboard.type(process.env.PASSWORD);
    await page.click('#submit-signin-local')
    await page.goto('https://members.actorsequity.org/castingcall/signups/');
    // const resultNum = await page.$("#lblEPAResults")
    // console.log(resultNum.textContent)
    await page.screenshot({path: 'example.png'});

    await browser.close();
}

signup()
