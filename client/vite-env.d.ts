interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_CLIENT_PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}