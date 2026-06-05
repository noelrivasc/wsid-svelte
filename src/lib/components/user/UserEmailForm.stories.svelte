<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import UserEmailFormLogin from './UserEmailFormLogin.svelte';
  import UserEmailFormRegister from './UserEmailFormRegister.svelte';

  const { Story } = defineMeta({
    title: 'Components/User/UserEmailForm',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Email-capture form for the magic-link flow. Always consume via the `UserEmailFormLogin` or `UserEmailFormRegister` wrappers — each supplies its own footer link (resolved with `$app/paths`). The underlying `UserEmailForm` takes a `footer` snippet and should not be imported directly. In Storybook, pass `mockSubmit` to intercept submission and inspect the form data via the Actions panel.'
        }
      }
    }
  });
</script>

<Story name="Login">
  <UserEmailFormLogin mockSubmit={fn()} onSuccess={fn()} />
</Story>

<Story name="Register">
  <UserEmailFormRegister mockSubmit={fn()} onSuccess={fn()} />
</Story>
