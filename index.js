const puppeteer = require('puppeteer');
require('dotenv').config();

 const signup = async () => {
    const auditionTitle = 'Cape May Stage 2020 Season'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://members.actorsequity.org/signin/?returnurl=%2F');
    await page.type('#Username', 'Slonergan');
    await page.keyboard.press('Tab');
    await page.keyboard.type(process.env.PASSWORD);
    await page.click('#submit-signin-local')
    await page.goto('https://members.actorsequity.org/castingcall/signups/');
    const numSignups = await page.evaluate( () => {
        const span = document.querySelector('#lblEPAResults')
        return span.innerText
    })
    console.log(numSignups)
    if (numSignups === '0') {
        console.log('no signups today!')
        await browser.close();
    } else {
        const audition = await page.evaluate( () => {
            const auditionCards = document.querySelectorAll('a')
            auditionCards.filter(card => card.innerText.includes(auditionTitle))
        })
        await page.screenshot({path: 'example.png'});
        await browser.close();
    }
}

signup()
