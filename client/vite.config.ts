import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'



export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())

	return {
		plugins: [react()],
		server: {
			port: Number(env.VITE_CLIENT_PORT),
			proxy: {
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					secure: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
			},
			events: {
				'restart': 'kill-port 3030',
				'crash': 'kill-port 3030',
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@stores': path.resolve(__dirname, './src/stores'),
				'@assets': path.resolve(__dirname, './src/assets'),
				'@components': path.resolve(__dirname, './src/components'),
				'@common': path.resolve(__dirname, './src/components/common'),
				'@others': path.resolve(__dirname, './src/components/others'),
				'@type': path.resolve(__dirname, './src/types'),
				'@hooks': path.resolve(__dirname, './src/hooks'),
				'@utils': path.resolve(__dirname, './src/utils'),
				'@features': path.resolve(__dirname, './src/features'),
				'@services': path.resolve(__dirname, './src/services'),
				'@api': path.resolve(__dirname, '../api'),
				'@shared': path.resolve(__dirname, '../shared'),
			},
		},
	}
})