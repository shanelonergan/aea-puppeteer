const puppeteer = require('puppeteer');
require('dotenv').config();

 const signup = async (auditionTitle) => {

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
    if (numSignups === '0') {
        console.log('no signups today!')
        await browser.close();
    } else {
        const audition = await page.evaluate( () => {
            const auditionColumn = document.getElementById('leftcolumnmain')
            return auditionCards
            // const filteredAuditions = auditionCards.filter(card => card.innerText.includes(auditionTitle))
            // console.log(filteredAuditions)
            // return filteredAuditions
        })
        console.log(audition)
        await page.click(audition)
        await page.screenshot({path: 'example.png'});
        await browser.close();
    }
}

signup()
