<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import UserConfirmLogin from './UserConfirmLogin.svelte';

  const { Story } = defineMeta({
    title: 'Components/User/UserConfirmLogin',
    component: UserConfirmLogin,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Final step of the magic-link flow: posts the login token to complete sign-in. In Storybook, pass `mockSubmit` to intercept submission and inspect the posted token via the Actions panel.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ token: 'sample-login-token', mockSubmit: fn() }} />
