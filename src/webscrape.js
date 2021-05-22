const puppeteer = require('puppeteer');

async function webscrape(schedule_id, week_number) {
  const browser = await puppeteer.launch({ headless: false, slowMo: 20 });
  const page = await browser.newPage();
  await page.goto(
    'https://web.skola24.se/timetable/timetable-viewer/halmstad.skola24.se/Kattegattgymnasiet/'
  );

  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `* {
    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
}`;
    document.head.appendChild(style);
  });

  await page.waitForXPath(
    '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/input'
  );
  const [elem_angeId] = await page.$x(
    '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/input'
  );
  console.log('elem_angeId:', elem_angeId);
  await elem_angeId.type(schedule_id);

  const [elem_visaBtn] = await page.$x(
    '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/button'
  );
  elem_visaBtn.click();

  await page.waitForSelector('rect');

  const elems_rect = await page.$$('rect');

  console.log('elems_rect:', elems_rect);

  for (const elem of elems_rect) {
    if (
      (await elem.evaluate(elem => elem.getAttribute('box-type'))) == 'Lesson'
    ) {
      // await page.waitForTimeout(5000);
      elem.click();
      await page.waitForXPath(
        '/html/body/div[3]/div[2]/div/div[4]/div/div/div[1]/div/div/div[1]/h2'
      );

      // await page.screenshot({ path: 'click.png' });

      const [elem_h2] = await page.$x(
        '/html/body/div[3]/div[2]/div/div[4]/div/div/div[1]/div/div/div[1]/h2'
      );
      const elem_h2_json = await elem_h2.getProperty('textContent');
      const elem_h2_text = await elem_h2_json.jsonValue();
      console.log('elem_h2_text:', elem_h2_text);

      // await page.waitForTimeout(1000);
      await page.waitForXPath(
        '/html/body/div[3]/div[2]/div/div[4]/div/div/div[2]/div/button'
      );
      const [button_close] = await page.$x(
        '/html/body/div[3]/div[2]/div/div[4]/div/div/div[2]/div/button'
      );
      button_close.click();
      await page.waitForTimeout(100);
    }
  }
  console.log('await browser.close();');
  // await browser.close();
}

module.exports = function (body) {
  console.log(body);
  webscrape(body.schedule_id, body.week_number);
};
