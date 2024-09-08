import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


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
        }
    }
})