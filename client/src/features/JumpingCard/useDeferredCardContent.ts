import { useEffect, useState } from 'react'



export function useDeferredCardContent<T>(sourceState: T, delayTimeMS = 300) {
	const [displayedState, setDisplayedState] = useState<T>(sourceState);

	useEffect(() => {
		if (sourceState === null) {
			const timeout = setTimeout(() => {
				setDisplayedState(null as T);
			}, delayTimeMS);
			return () => clearTimeout(timeout);
		} else {
			setDisplayedState(sourceState);
		}
	}, [sourceState, delayTimeMS]);

	const isCardVisible = sourceState !== null || displayedState !== null;

	return { displayedState, isCardVisible };
}