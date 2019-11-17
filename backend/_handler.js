import { parse } from 'url';
import { getInvokeHandler } from '@reshuffle/server-function';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV === 'development';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const expressApp = express();
const invokeHandler = getInvokeHandler(__dirname);
const prepared = nextApp.prepare();

expressApp.post('/invoke', express.json(), invokeHandler);
expressApp.use(async (req, res) => {
  await prepared;
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

export default expressApp;
