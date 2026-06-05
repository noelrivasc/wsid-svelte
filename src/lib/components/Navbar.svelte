<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider
  } from 'flowbite-svelte';
  import { BrainOutline, UserCircleSolid, ChevronDownOutline } from 'flowbite-svelte-icons';

  type Props = {
    user: App.Locals['user'];
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { user, mockSubmit }: Props = $props();

  let userMenuOpen = $state(false);

  const submit: SubmitFunction = ({ formData, cancel }) => {
    if (mockSubmit) {
      mockSubmit(Object.fromEntries(formData));
      cancel();
      return;
    }
  };
</script>

<Navbar fluid class="border-b border-c01 bg-ground" navContainerClass="max-w-5xl mx-auto">
  <NavBrand href="/" class="flex items-center gap-2">
    <BrainOutline class="h-7 w-7 text-cta" />
    <span class="self-center text-xl font-semibold whitespace-nowrap text-body">WSID</span>
  </NavBrand>

  <div class="flex items-center md:order-2">
    <button
      type="button"
      class="flex items-center gap-1 rounded-full p-1 text-body hover:bg-c01 focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Open user menu"
    >
      <UserCircleSolid class="h-7 w-7" />
      <ChevronDownOutline class="h-4 w-4" />
    </button>
    <Dropdown bind:isOpen={userMenuOpen} simple class="w-44">
      {#if user}
        <DropdownHeader>
          <span class="block truncate text-sm">{user.email}</span>
        </DropdownHeader>
        <DropdownItem href="/decisions">Decisions</DropdownItem>
        <DropdownDivider />
        <form method="POST" action="/users/logout" use:enhance={submit}>
          <DropdownItem
            onclick={(e: MouseEvent) =>
              (e.currentTarget as HTMLElement).closest('form')?.requestSubmit()}
          >
            Sign out
          </DropdownItem>
        </form>
      {:else}
        <DropdownHeader>
          <span class="block text-sm">Signed out</span>
        </DropdownHeader>
        <DropdownDivider />
        <DropdownItem href="/users/login">Login</DropdownItem>
        <DropdownItem href="/users/register">Sign up</DropdownItem>
      {/if}
    </Dropdown>
    <NavHamburger />
  </div>
</Navbar>
