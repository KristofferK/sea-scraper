import { ITenancyGenerator } from './i-tenancy-generator';
import { Tenancy } from '../models/tenancy';
import { Link } from '../models/link';

export class DefaultTenancyGenerator implements ITenancyGenerator {
  generateTenancy(link: Link, element: HTMLDivElement): Tenancy {
    const tenancy = new Tenancy();
    tenancy.website = link.url;
    return tenancy;
  }
}
