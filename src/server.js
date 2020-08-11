import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { PrismaClient } from '@prisma/client';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const prisma = new PrismaClient();

express()
	.use((req, res, next) => {
		req["prisma"] = prisma;
		next();
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
