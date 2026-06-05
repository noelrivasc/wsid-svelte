<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TestBox from './TestBox.svelte';

  const { Story } = defineMeta({
    title: 'Components/TestBox',
    component: TestBox,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: { type: 'inline-radio' },
        options: ['red', 'blue']
      },
      text: { control: 'text' }
    },
    args: {
      color: 'red',
      text: 'Hello'
    }
  });
</script>

<Story name="Playground" />

<!--
	Deliberately invalid props to exercise the Zod error UI.
	`as any` bypasses the compile-time type check so the runtime guard has
	something to catch — that's the whole point of this story.
-->
<Story name="InvalidProps" args={{ color: 'green' as any, text: '' }} />
