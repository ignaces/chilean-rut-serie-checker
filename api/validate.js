const puppeteer = require('puppeteer');

async function run(username, serie, type) {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml');

  // dom element selectors
  const USERNAME_SELECTOR = '#form\\:run';
  const SERIAL_SELECTOR = '#form\\:docNumber';
  const BUTTON_SELECTOR = '#volverTable > tbody > tr > td > a';
  const TYPE_SELECTOR = '#form\\:selectDocType';
  const RESULT_SELECTOR = '#tableResult > tbody > tr > td.setWidthOfSecondColumn';
  const ERROR_SELECTOR = '#zoneErreur';

  await page.click(USERNAME_SELECTOR);
  await page.type(USERNAME_SELECTOR, username);

  await page.click(SERIAL_SELECTOR);
  await page.type(SERIAL_SELECTOR, serie);

  await page.click(TYPE_SELECTOR);
  await page.select(TYPE_SELECTOR, type);

  let obj = null;

  try {
    await page.click(BUTTON_SELECTOR);
    await page
    .waitFor(ERROR_SELECTOR, {visible: true, timeout:1000})
    .then(() => {

      obj = {
        status: false,
        message: 'Serial incompatible'
      };
    });
  }
  catch (e)
  {
    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();
    let result = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element? element.innerHTML: null;
    }, RESULT_SELECTOR);

    obj = {
      status: (result == "Vigente" ? true : false),
      message: result
    };
  }

  await browser.close();

  return obj;

}

module.exports.validateByUsernameAndSerie = (username, serie, type) => {
  let data = run(username, serie, type);
  return data;
}
