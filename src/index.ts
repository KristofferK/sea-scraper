import { SEAClient } from './sea-client';
import { DefaultTenancyGenerator } from './tenancy-generators/default-tenancy-generator';

(async() => {
  const client = await SEAClient.initialize();
  const links = await client.getLinks();

  const apartments = await links.map(link => client.getTenanciesFromLink(link, new DefaultTenancyGenerator()))
  .reduce((a: any[], b) => {
    return a.concat(b);
  }, []);

  // process.exit();
})();
