import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './Navbar.svelte';

// Minimal stand-in for the better-auth user shape; only `email` is read.
const authedUser = { email: 'jane@example.com' } as App.Locals['user'];

async function openMenu() {
	await page.getByRole('button', { name: 'Open user menu' }).click();
}

describe('Navbar.svelte', () => {
	it('shows Login and Sign up when signed out', async () => {
		render(Navbar, { user: null });
		await openMenu();

		await expect.element(page.getByText('Signed out')).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Login' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
		await expect.element(page.getByText('Sign out')).not.toBeInTheDocument();
	});

	it('shows the email, Decisions and Sign out when authenticated', async () => {
		render(Navbar, { user: authedUser });
		await openMenu();

		await expect.element(page.getByText('jane@example.com')).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Decisions' })).toBeInTheDocument();
		await expect.element(page.getByText('Sign out')).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Login' })).not.toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Sign up' })).not.toBeInTheDocument();
	});
});
