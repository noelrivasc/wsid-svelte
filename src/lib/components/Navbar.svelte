<script lang="ts">
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

	let userMenuOpen = $state(false);
</script>

<Navbar
	fluid
	class="border-b border-c01 bg-ground"
	navContainerClass="max-w-5xl mx-auto"
>
	<NavBrand href="/" class="flex items-center gap-2">
		<BrainOutline class="h-7 w-7 text-cta" />
		<span class="self-center text-xl font-semibold whitespace-nowrap text-body">WSID</span>
	</NavBrand>

	<div class="flex items-center md:order-2">
		<button
			type="button"
			class="flex items-center gap-1 rounded-full p-1 text-body hover:bg-c01 focus:outline-none focus:ring-2 focus:ring-c02"
			aria-label="Open user menu"
		>
			<UserCircleSolid class="h-7 w-7" />
			<ChevronDownOutline class="h-4 w-4" />
		</button>
		<Dropdown bind:isOpen={userMenuOpen} simple class="w-44">
			<DropdownHeader>
				<span class="block text-sm">Signed out</span>
			</DropdownHeader>
			<DropdownDivider />
			<DropdownItem href="/decisions">Decisions</DropdownItem>
		</Dropdown>
		<NavHamburger />
	</div>
</Navbar>
