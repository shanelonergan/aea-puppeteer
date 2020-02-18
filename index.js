const puppeteer = require('puppeteer');
require('dotenv').config();

 const signup = async () => {

    // time stuff
    // const  now = new Date();
    // const  millisTill12 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0) - now;
    // if (millisTill12 < 0) {
    //     console.log('it is after noon!')
    // } else {
    //     setTimeout(function(){alert("It's 12pm!")}, millisTill12);
    // }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://members.actorsequity.org/signin/?returnurl=%2F');
    await page.type('#Username', 'Slonergan');
    await page.keyboard.press('Tab');
    await page.keyboard.type(process.env.PASSWORD);
    await page.click('#submit-signin-local')
    await page.goto('https://members.actorsequity.org/castingcall/signups/');
    await page.screenshot({path: 'signups.png'});
    const numSignups = await page.evaluate( () => {
    const span = document.querySelector('#lblEPAResults')
        return span.innerText
    })
    console.log(numSignups)
    // if (numSignups === '0') {
    //     console.log('no signups today!')
    //     await browser.close();
    // } else {
    await page.waitForSelector('#leftcolumnmain')
    const auditionColumn = await page.$('#leftcolumnmain')
    const links = await auditionColumn.$$eval('a', anchors => {
        return anchors.map(anchor => anchor.innerText)
        })
    console.log(links)
    const audition = await page.evaluate( () => {
        const auditionColumn = document.querySelector('#leftcolumnmain')
        const links = auditionColumn.querySelectorAll('a')
        const linksArr = Array.from(links)
        const filteredAuditions = linksArr.filter(card => card.innerText.includes('Ogunquit Playhouse 2020 Season - NYC EPA'))
        return filteredAuditions
    })
        // await page.goto('https://members.actorsequity.org/castingcall/signups/');
        // await page.waitForSelector('.search-list-group-item')
        // await page.screenshot({path: 'signups.png'});
        // const links = await page.$$eval('li', anchors => anchors)
    console.log(audition, 40)
    await page.click(audition)
    await page.screenshot({path: 'example.png'});
    await browser.close();
    // }
}

signup()
