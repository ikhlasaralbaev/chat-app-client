import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

// @ts-ignore
const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), glsl()],
	resolve: {
		alias: {
			components: resolve(root, 'components'),
			services: resolve(root, 'services'),
			store: resolve(root, 'store'),
			pages: resolve(root, 'pages'),
			mocks: resolve(root, 'mocks'),
			api: resolve(root, 'api'),
			assets: resolve(root, 'assets'),
			lib: resolve(root, 'lib'),
			hooks: resolve(root, 'hooks'),
			config: resolve(root, 'config'),
		},
	},
})
