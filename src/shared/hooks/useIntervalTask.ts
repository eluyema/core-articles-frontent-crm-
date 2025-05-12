import { useEffect, useRef } from 'react';

export function useIntervalTask(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    // Update the ref each render so the latest callback is used
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay == null || delay < 0) return;

        const tick = () => savedCallback.current();

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
