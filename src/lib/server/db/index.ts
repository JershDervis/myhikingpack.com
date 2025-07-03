import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient(
	dev
		? {
				url: env.DATABASE_URL
			}
		: {
				url: env.DATABASE_URL,
				authToken: env.DATABASE_AUTH_TOKEN
			}
);

export const db = drizzle(client, { schema });
