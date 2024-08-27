import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import {
	presetAttributify,
	presetIcons,
	presetTagify,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		UnoCSS({
			presets: [
				presetUno(),
				presetTagify(),
				presetAttributify(),
				presetIcons({
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'middle'
					}
				})
			],
			transformers: [transformerDirectives(), transformerVariantGroup()],
			extractors: [extractorSvelte()],
			rules: [
				[
					/^family-([a-zA-Z\-]*)$/,
					([, c]) => {
						return {
							'font-family': `${c}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
						};
					}
				]
			],
			shortcuts: [
				{
					'flex-center': 'items-center justify-center'
				},
				{
					'absolute-center': '-translate-1/2 left-1/2 top-1/2'
				}
			]
		}),
		sveltekit()
	]
};

export default config;
