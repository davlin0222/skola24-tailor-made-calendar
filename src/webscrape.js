const puppeteer = require('puppeteer');

module.exports = async function (options) {
    const config = {
        schedule_id__value: options.schedule_id,
        week_number__value: options.week_number,
    };
    console.log('🚀 ~ file: webscrape.js ~ line 8 ~ config', config);

    if (
        typeof config.schedule_id__value == 'undefined' ||
        config.schedule_id__value == ''
    ) {
        console.error('Error: invalid schedule_id');
        return;
    }

    const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
    const page = await browser.newPage();

    // Do the webscraping
    try {
        await webscrape(page, config);
    } catch (error) {
        console.log('🚀 ~ file: webscrape.js:', error);
    } finally {
        console.log('Close the browser');
        await browser.close();
    }
};

async function webscrape(page, config) {
    await page.goto(
        'https://web.skola24.se/timetable/timetable-viewer/halmstad.skola24.se/Kattegattgymnasiet/'
    );

    // Turn off css animations
    await page.evaluate(() => {
        const style__elem = document.createElement('style');
        style__elem.innerHTML = `* {
    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
}`;
        document.head.appendChild(style__elem);
    });

    /* ----------------------------- Set Schedule ID ---------------------------- */

    const schedule_id__XPath =
        '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/input';
    await page.waitForXPath(schedule_id__XPath);

    const [schedule_id__elem] = await page.$x(schedule_id__XPath);
    await schedule_id__elem.type(config.schedule_id__value);

    /* --------------------------- Press "show" button -------------------------- */

    const [show__button_elem] = await page.$x(
        '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/button'
    );
    await show__button_elem.click();

    // Wait for the calendar blocks to load
    // await page.waitForSelector('rect');
    await page.waitForTimeout(900); // Magic value

    const calendar_block__check__elems = await page.$$('rect');

    // Check if calender blocks got loaded
    if (calendar_block__check__elems.length <= 0) {
        console.error('Rejected schedule_id');
        return;
    }

    /* --------------------------- Select week number --------------------------- */

    {
        if (
            typeof config.week_number__value == 'undefined' ||
            config.week_number__value == ''
        )
            return;

        const [week_number__button_elem] = await page.$x(
            '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div/button'
        );
        await week_number__button_elem.click();

        await page.keyboard.type('.' + config.week_number__value);

        const week_number__first_dropdown_elem_item__XPath =
            '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div/ul/li';

        await page.waitForXPath(week_number__first_dropdown_elem_item__XPath);

        const [week_number__first_dropdown_elem_item] = await page.$x(
            week_number__first_dropdown_elem_item__XPath
        );
        await week_number__first_dropdown_elem_item.click();

        await page.waitForTimeout(300); // Magic value
    }

    /* ---------------------- Loop through calendar blocks ---------------------- */

    const calendar_block__elems = await page.$$('rect');

    for (const calendar_block__elem of calendar_block__elems) {
        if (
            (await calendar_block__elem.evaluate(elem =>
                elem.getAttribute('box-type')
            )) != 'Lesson'
        ) {
            continue;
        }

        await calendar_block__elem.click();

        const header__elem__XPath =
            '/html/body/div[3]/div[2]/div/div[4]/div/div/div[1]/div/div/div[1]/h2';

        await page.waitForXPath(header__elem__XPath);

        const [header__elem] = await page.$x(header__elem__XPath);
        const header__elem__json = await header__elem.getProperty(
            'textContent'
        );
        const header__elem__text = await header__elem__json.jsonValue();
        console.log('header__elem__text:', header__elem__text);

        const detail__elems = await page.$x(
            '/html/body/div[3]/div[2]/div/div[4]/div/div/div[1]/div/div/div[2]/ul/li/div/div'
        );

        for (const detail__elem of detail__elems) {
            const detail__elem__json = await detail__elem.getProperty(
                'textContent'
            );
            const detail__elem__text = await detail__elem__json.jsonValue();
            console.log('detail__elem__text:', detail__elem__text);
        }

        const close__button__XPath =
            '/html/body/div[3]/div[2]/div/div[4]/div/div/div[2]/div/button';
        await page.waitForXPath(close__button__XPath);

        const [close__button] = await page.$x(close__button__XPath);
        await close__button.click();

        await page.waitForTimeout(500); // Magic value
    }
}
