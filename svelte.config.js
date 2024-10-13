import { vitePreprocess } from '@astrojs/svelte';
import node from '@astrojs/node';

export default {
	output: 'hybrid',
	adapter: node({
		mode: 'standalone',
	  }),
	preprocess: vitePreprocess(),
}
