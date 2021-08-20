const puppeteer = require('puppeteer');
const ID = '021022-0273';
(async () => {
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
  await elem_angeId.type(ID);

  const [elem_visaBtn] = await page.$x(
    '/html/body/div[3]/div[2]/div/div[2]/div[1]/div[1]/div[6]/div/div/button'
  );
  elem_visaBtn.click();

  // const elems_text = await page.evaluate(() => {
  //   const text = document.querySelectorAll('div');
  //   return text;
  // });
  // await page.waitForTimeout('1000');
  await page.waitForSelector('rect');

  const elems_rect = await page.$$('rect');

  console.log('elems_rect:', elems_rect);

  for (const elem of elems_rect) {
    if (
      (await elem.evaluate(elem => elem.getAttribute('box-type'))) == 'Lesson'
    ) {
      // await page.waitForTimeout(5000);
      // console.log(elem);
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
      // // button_close.dispose();
      button_close.click();
      await page.waitForTimeout(100);

      // break;
    }
    // console.log());
    // console.log('elems_rect_lesson:', elems_rect_lesson);
  }

  // await page.click('rect[box-type:Lesson]');
  // const elems_rect_lesson = await page.$$eval(
  //   'rect',
  //   list => list
  //   // list.filter(elem => elem.getAttribute('box-type') == 'Lesson')
  // );
  // const elems_rect_lesson = await page.$$eval('rect', list =>
  //   list.map(elem => {
  //     elem.getAttribute('box-type');
  //   })
  // );

  // const elems_text = await page.$$eval('text', list =>
  //   list.map(elem => {
  //     return elem.innerHTML;
  //   })
  // );
  // console.log('elems_text:', elems_text);

  // elems_text_content_json = await elems_text.getProperty('textContent');
  // elems_text_content = await elems_text_content_json.jsonValue();
  // console.log('elems_text:', elems_text_content);

  // const listHandle = await page.evaluateHandle(() => document.body.children);
  // const properties = await listHandle.getProperties();
  // const children = [];
  // for (const property of properties.values()) {
  //   const element = property.asElement();
  //   if (element) children.push(element);
  // }
  // console.log('children:', children); // holds elementHandles to all children of document.body

  // .map(element => {
  //     return element.getProperty.innerText;
  //   })
  // const test = [1,2,3]
  // const test2 = test.map()

  // console.log('')
  /* 
  // ].click();

  // const elem_angeId = await elem_angeId.getProperty('textContent');
  // const dropdownContent = await text.jsonValue();
  */

  // await page.screenshot({ path: 'example.png' });

  console.log('await browser.close();');
  // await browser.close();
})();
