import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const runLocal = process.env.NODE_ENV === 'development';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'turso',
	dbCredentials: runLocal
		? {
				url: process.env.DATABASE_URL
			}
		: {
				url: process.env.DATABASE_URL,
				authToken: process.env.DATABASE_AUTH_TOKEN
			},
	verbose: true,
	strict: true
});
