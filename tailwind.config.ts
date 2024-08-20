import flowbitePlugin from 'flowbite/plugin';

import type { Config } from 'tailwindcss';

export default {
	content: ['./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					'100': '#fff7ed',
					'200': '#ffedd5',
					'300': '#fed7aa',
					'400': '#fdba74',
					'500': '#fb923c',
					'600': '#f97316',
					'700': '#ea580c',
					'800': '#c2410c',
					'900': '#9a3412'
				}
			}
		}
	},

	plugins: [flowbitePlugin]
} as Config;
