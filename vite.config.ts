import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import { presetAttributify, presetIcons, presetTagify, presetUno } from 'unocss';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		UnoCSS({
			presets: [presetUno(), presetTagify(), presetAttributify(), presetIcons()],
			extractors: [extractorSvelte()]
		}),
		sveltekit()
	]
};

export default config;
