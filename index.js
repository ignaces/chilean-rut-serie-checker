const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml');

  // dom element selectors
  const USERNAME_SELECTOR = '#form\\:run';
  const SERIAL_SELECTOR = '#form\\:docNumber';
  const BUTTON_SELECTOR = '#volverTable > tbody > tr > td > a';
  const TYPE_SELECTOR = '#form\\:selectDocType'
  const RESULT_SELECTOR = '#tableResult > tbody > tr > td.setWidthOfSecondColumn'

  await page.click(USERNAME_SELECTOR);
  await page.type(USERNAME_SELECTOR, CREDS.username);

  await page.click(SERIAL_SELECTOR);
  await page.type(SERIAL_SELECTOR, CREDS.serie);

  await page.click(TYPE_SELECTOR);
  await page.select(TYPE_SELECTOR, CREDS.type);

  await page.click(BUTTON_SELECTOR);
  await page.waitForNavigation();

  let result = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element? element.innerHTML: null;
    }, RESULT_SELECTOR);

  console.log(result);
}

run();
