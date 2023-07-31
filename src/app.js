import express from 'express';
import { run } from './start/run.js';
import { modules } from './start/module.js';

const app = express();
run(app);
modules(app);
