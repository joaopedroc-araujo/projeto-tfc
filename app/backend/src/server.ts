import { App } from './app';

const PORT = process.env.MYSQLPORT || 3001;

new App().start(PORT);
