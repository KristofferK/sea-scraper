import { Browser, Page, launch, Response } from 'puppeteer';
import { existsSync, mkdirSync, promises } from 'fs';
import { Link } from './models/link';
import { ITenancyGenerator } from './tenancy-generators/i-tenancy-generator';
import { Tenancy } from './models/tenancy';

export class SEAClient {
  private screenshotsFolder = "screenshots/";
  
  private constructor(private browser: Browser, private page: Page) {
    if (!existsSync(this.screenshotsFolder)) {
      mkdirSync(this.screenshotsFolder);
    }
  }
  
  static async initialize(width: number = 1280, height: number = 800): Promise<SEAClient> {
    const browser = await launch();
    const page = await browser.newPage();
    page.setViewport({width: width, height: height});
    return Promise.resolve(new SEAClient(browser, page));
  }

  async getLinks(): Promise<Link[]> {
    await this.page.goto('https://www.salling-ejendomsadministration.dk/ledige-lejemaal');
    await this.page.waitForSelector('div[data-margin="15"][data-width="180"][data-height="30"] a');
    await this.page.waitFor(200); // Won't have innerText otherwise
    
    const links: Link[] = await this.page.evaluate(() => {
      return (<HTMLAnchorElement[]>[...document.querySelectorAll('div[data-margin="15"][data-width="180"][data-height="30"] a')])
      .map(e => { return { title: e.innerText, url: e.getAttribute('href') }})
      .filter(e => !isNaN(+e.title.substr(0, 4)))
    });
    return links;
  }

  async getTenanciesFromLink(link: Link, tenancyGenerator: ITenancyGenerator): Promise<Tenancy[]> {
    const elements = await this.getTenancyElements(link);
    return elements.map(element => tenancyGenerator.generateTenancy(link, element));
  }

  private async getTenancyElements(link: Link): Promise<HTMLDivElement[]> {
    await this.page.goto(link.url);
    await this.page.waitForSelector('asidaiodasda');
    await this.page.waitFor(200);
    let elements: HTMLDivElement[] = []
    return elements;
  }
  
  private async screenshot(file: string) {
    return this.page.screenshot({ path: `${this.screenshotsFolder}/${file}` });
  }
}
