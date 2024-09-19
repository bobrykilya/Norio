interface ImportMeta {
	env: {
		VITE_API_URL: string;
		VITE_CLIENT_PORT: string;
	};
}

type IDurationType = 'second' | 'minute' | 'hour' | null