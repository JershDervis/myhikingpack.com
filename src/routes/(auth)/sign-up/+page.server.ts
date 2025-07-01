import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/types/form-schema';

export const load: PageServerLoad = async (event) => {
	// If the user is already logged in, redirect to the home page
	if (event.locals.user) return redirect(302, '/');

	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	signup: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const email = form.data.email;
		const password = form.data.password;

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, email, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { form });
		}

		return {
			form
		};
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
