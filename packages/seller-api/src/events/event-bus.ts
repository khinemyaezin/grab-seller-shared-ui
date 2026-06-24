type EventPayloads = {
}
export const eventBus = {
    publish<T extends Extract<keyof EventPayloads,string>>(event: T, detail: EventPayloads[T]) {
        const customEvent = new CustomEvent(event, { detail });
        window.dispatchEvent(customEvent);
    },
    subscribe<T extends Extract<keyof EventPayloads, string>>(event: T, callback: (detail: EventPayloads[T]) => void) {
        const handler = (e: Event) => {
            try {
                callback((e as CustomEvent).detail);
            } catch (error) {
                console.error(`[EventBus] Error in subscriber for ${String(event)}:`, error);
            }
        };
        window.addEventListener(event, handler);
        return () => window.removeEventListener(event, handler);
    }
};