const startTunel = require('../scripts/tunel.js');
import config from './config';
import App from './app/app';

startTunel(config.inConnection.http.port).then(async (origin: string) => {
  config.inConnection.tg.origin = origin;
  config.env.ORIGIN = origin;

  await new App(config).start();

  console.log(origin);
});
