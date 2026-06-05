<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UserProfile from './UserProfile.svelte';
  import { sampleUser } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/User/UserProfile',
    component: UserProfile,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'Shows which account is currently signed in.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ email: sampleUser.email }} />
