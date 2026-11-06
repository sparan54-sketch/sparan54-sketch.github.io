import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('/tmp/freddy-browser/package.json');
const puppeteer = require('puppeteer-core');

const repo = '/agent/repos/sparan54-sketch.github.io';
const shots = '/opt/cursor/artifacts';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const file = normalize(join(repo, pathname));
      if (!file.startsWith(repo)) {
        res.writeHead(403);
        res.end('no');
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch (err) {
      res.writeHead(404);
      res.end(String(err.message || 'missing'));
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function shot(page, name) {
  const path = join(shots, name);
  await page.screenshot({ path, fullPage: false });
  console.log('shot', path);
  return path;
}

async function assertContain(page) {
  const report = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('.crew img, .hero img')];
    return imgs.map((img) => {
      const style = getComputedStyle(img);
      const frame = img.getBoundingClientRect();
      return {
        alt: img.alt,
        fit: style.objectFit,
        nw: img.naturalWidth,
        nh: img.naturalHeight,
        w: Math.round(frame.width),
        h: Math.round(frame.height),
        complete: img.complete,
      };
    });
  });
  if (!report.length) throw new Error('no portraits');
  for (const img of report) {
    if (img.fit !== 'contain') throw new Error(`object-fit ${img.fit} for ${img.alt}`);
    if (!img.complete || img.nw < 500 || img.nh < 500) throw new Error(`image not loaded ${JSON.stringify(img)}`);
  }
  return report;
}

async function run() {
  const server = await startServer();
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}/freddys/`;
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const failures = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', (err) => failures.push(String(err)));
    await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-choice="read-note"]');
    const opening = await page.evaluate(() => ({
      title: document.querySelector('.logo').textContent,
      clock: document.querySelector('#clock').textContent,
      disclaimer: document.querySelector('.disclaimer').textContent,
      choices: [...document.querySelectorAll('.choice')].map((button) => ({
        h: Math.round(button.getBoundingClientRect().height),
        text: button.innerText,
      })),
      scrollWidth: document.documentElement.scrollWidth,
      sound: document.querySelector('#btn-sound').getAttribute('aria-pressed'),
      crew: document.querySelectorAll('.crew button').length,
    }));
    if (!opening.disclaimer.includes('Not affiliated')) throw new Error('missing disclaimer');
    if (opening.clock !== '12:00 AM') throw new Error(opening.clock);
    if (opening.crew !== 5) throw new Error('crew ' + opening.crew);
    if (opening.sound !== 'false') throw new Error('sound default ' + opening.sound);
    if (opening.scrollWidth > 364) throw new Error('horizontal overflow ' + opening.scrollWidth);
    if (opening.choices.length < 2 || opening.choices.length > 4) throw new Error('choice count');
    for (const choice of opening.choices) {
      if (choice.h < 56) throw new Error(`choice too short ${choice.h} ${choice.text}`);
    }
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
    const portraits = await assertContain(page);
    console.log('mobile portraits', portraits.map((p) => `${p.nw}x${p.nh}`).join(', '));
    await shot(page, 'freddys-mobile-opening.png');
    const heroBox = await page.$eval('.hero', (el) => {
      const box = el.getBoundingClientRect();
      return { top: box.top, height: box.height, bottom: box.bottom };
    });
    if (heroBox.height < 180) throw new Error('hero too short ' + JSON.stringify(heroBox));
    if (heroBox.top > 520) throw new Error('hero starts too low ' + JSON.stringify(heroBox));
    await shot(page, 'freddys-mobile-portrait.png');
    await page.screenshot({ path: join(shots, 'freddys-mobile-opening-full.png'), fullPage: true });

    await page.click('[data-choice="read-note"]');
    await page.waitForFunction(() => document.querySelector('#story-title').textContent.includes('Laminated'));
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('freddys-autosave-v1')));
    if (saved.node !== 'corporate-note') throw new Error('autosave node ' + saved.node);
    if (saved.minutes <= 0) throw new Error('clock did not advance');
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('#story-title').textContent.includes('Laminated'));
    await shot(page, 'freddys-mobile-scene.png');

    await page.click('#btn-restart');
    await page.waitForSelector('#yes-restart');
    await page.click('#yes-restart');
    await page.waitForFunction(() => document.querySelector('#clock').textContent === '12:00 AM');

    await page.click('#btn-save');
    await page.waitForSelector('#save-a');
    await page.click('#save-a');
    await page.waitForSelector('[data-choice="read-note"]');
    await page.click('[data-choice="read-note"]');
    await page.click('#btn-save');
    await page.waitForSelector('#load-a');
    const loadDisabled = await page.$eval('#load-a', (button) => button.disabled);
    if (loadDisabled) throw new Error('slot A should load');
    await page.click('#load-a');
    await page.waitForFunction(() => document.querySelector('#story-title').textContent.includes('Bunny on the clock'));

    await page.click('[data-choice="read-note"]');
    await page.click('[data-choice="to-kitchen"]');
    await page.click('[data-choice="cooler"]');
    await page.click('[data-choice="foam-now"]');
    await page.waitForFunction(() => document.querySelector('#story-title').textContent.includes('Foam Manager'));
    const meta = await page.evaluate(() => JSON.parse(localStorage.getItem('freddys-meta-v1')));
    if (!meta.endings['ending-foam-manager']) throw new Error('ending not logged ' + JSON.stringify(meta));
    await shot(page, 'freddys-mobile-ending.png');
    await page.click('[data-action="restart-ending"]');
    await page.click('#yes-restart');
    await page.waitForFunction(() => document.querySelector('#clock').textContent === '12:00 AM');
    const kept = await page.evaluate(() => JSON.parse(localStorage.getItem('freddys-meta-v1')));
    if (!kept.endings['ending-foam-manager']) throw new Error('restart wiped the night log');

    await page.click('#btn-pockets');
    await page.waitForFunction(() => document.querySelector('#modal-title').textContent.includes('Pockets'));
    await page.click('#modal-x');
    await page.click('#btn-people');
    await page.waitForFunction(() => document.body.innerText.includes('Joey Cha-Cha: New'));
    await page.click('#modal-x');

    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.click('#btn-cams');
    await page.waitForFunction(() => document.body.innerText.includes('Parts & Service'));
    const board = await page.evaluate(() => document.body.innerText);
    for (const name of ['Bhad Bunny', 'Bubba Beer Bot', 'Ticklish Tiggy', 'Chicken Pete', 'Joey Cha-Cha']) {
      if (!board.includes(name) && name !== 'Bhad Bunny') {
        /* floor board lists stationed people, not necessarily Bhad */
      }
    }
    if (!board.includes('Ticklish Tiggy') || !board.includes('Bubba Beer Bot') || !board.includes('Chicken Pete') || !board.includes('Joey Cha-Cha')) {
      throw new Error('floor board missing cast');
    }
    await shot(page, 'freddys-desktop-floor-board.png');
    await page.click('#modal-x');
    await page.click('#btn-cast');
    await page.waitForFunction(() => document.querySelectorAll('.cast-card img').length === 5);
    await page.waitForFunction(() => [...document.querySelectorAll('.cast-card img')].every((img) => img.naturalWidth > 500));
    const galleryFit = await page.evaluate(() => [...document.querySelectorAll('.cast-card img')].map((img) => getComputedStyle(img).objectFit));
    if (galleryFit.some((fit) => fit !== 'contain')) throw new Error('gallery fit ' + galleryFit.join(','));
    await page.waitForFunction(() => document.querySelector('#cast-status').textContent.includes('All 5'));
    await shot(page, 'freddys-desktop-cast.png');
    await page.click('#modal-x');
    await shot(page, 'freddys-desktop-shift.png');

    const offline = await browser.newPage();
    await offline.setViewport({ width: 360, height: 800, deviceScaleFactor: 1, isMobile: true });
    offline.on('pageerror', (err) => failures.push('offline ' + err));
    await offline.goto(`http://127.0.0.1:${port}/freddys/play-offline.html`, { waitUntil: 'networkidle0' });
    await offline.waitForSelector('[data-choice="strut"]');
    const offlineImgs = await offline.evaluate(() => [...document.querySelectorAll('.crew img')].map((img) => img.naturalWidth));
    if (offlineImgs.length !== 5 || offlineImgs.some((w) => w < 500)) throw new Error('offline portraits ' + offlineImgs.join(','));
    await offline.click('[data-choice="strut"]');
    await offline.waitForFunction(() => document.querySelector('#story-title').textContent.includes('Mandatory'));
    await offline.screenshot({ path: join(shots, 'freddys-offline-mobile.png') });

    if (failures.length) throw new Error(failures.join('\n'));
    console.log('browser ok');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
