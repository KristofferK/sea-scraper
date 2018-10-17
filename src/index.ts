import { SEAClient } from "./sea-client";
import { Link } from './models/link';

(async() => {
  const client = await SEAClient.initialize();
  client.getLinks().then(console.log).catch(e => console.log('ERROR', e));

  // process.exit();
})();