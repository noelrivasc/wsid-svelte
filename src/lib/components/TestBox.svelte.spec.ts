import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TestBox from './TestBox.svelte';

describe('TestBox.svelte', () => {
  it('renders the provided text when props are valid', async () => {
    render(TestBox, { color: 'red', text: 'Hello world' });

    await expect.element(page.getByText('Hello world')).toBeInTheDocument();
    await expect.element(page.getByRole('alert')).not.toBeInTheDocument();
  });

  it('renders an error alert when props fail Zod validation', async () => {
    // `as never` bypasses the compile-time check so we can exercise the
    // runtime guard — the whole point of the schema.
    render(TestBox, { color: 'green' as never, text: '' });

    await expect.element(page.getByRole('alert')).toBeInTheDocument();
  });
});
