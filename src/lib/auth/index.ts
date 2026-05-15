import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { getSqlite } from '../store/db';
import { config } from '$lib/utils/config';
import { sendEmail } from '../utils/mailer';

let _auth: ReturnType<typeof createAuth> | null = null;

export function createAuth() {
  const auth = betterAuth({
    database: getSqlite(),
    secret: config.betterAuthSecret,
    baseURL: config.betterAuthUrl,
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24
    },
    plugins: [
      magicLink({
        expiresIn: 60 * 60,
        sendMagicLink: async ({ email, token }) => {
          const link = `${config.betterAuthUrl}/users/login/confirm?token=${encodeURIComponent(token)}`;
          await sendEmail({
            to: email,
            subject: 'Your login link',
            text: `Click here to log in: ${link}`,
            html: `<p>Click <a href="${link}">here</a> to log in.</p>`
          });
        }
      }),
      // Must be last: forwards better-auth's Set-Cookie headers onto
      // SvelteKit's `event.cookies` so they reach the browser.
      sveltekitCookies(getRequestEvent)
    ]
  });

  return auth;
}

export function getAuth() {
  if (_auth) return _auth;

  _auth = createAuth();
  return _auth;
}
