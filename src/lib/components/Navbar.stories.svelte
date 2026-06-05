<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import Navbar from './Navbar.svelte';
  import { sampleUser } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Top navigation bar with an auth-aware profile menu. Open the user menu to reveal the links. When signed in, the menu exposes a logout form; in Storybook, pass `mockSubmit` to intercept the sign-out submission and inspect it via the Actions panel.'
        }
      }
    }
  });
</script>

<Story name="Signed in" args={{ user: sampleUser, mockSubmit: fn() }} />

<Story name="Signed out" args={{ user: null }} />
