import { Tenancy } from '../models/tenancy';
import { Link } from '../models/link';

export interface ITenancyGenerator {
  generateTenancy(link: Link, element: HTMLDivElement): Tenancy
}
