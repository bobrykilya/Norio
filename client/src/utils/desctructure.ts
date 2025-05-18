export const safeDestructure = <T extends object>(obj: T | null | undefined): Partial<T> => {
	return obj ?? {} as Partial<T>;
}