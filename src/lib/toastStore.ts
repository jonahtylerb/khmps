import { writable } from 'svelte/store';

export const toasts = writable([]);

type Toast = { message: string; icon: string; color: string; timeout?: number };

export const addToast = (toast: Toast) => {
	toasts.update((all) => [toast, ...all]);

	if (toast.timeout) {
		setTimeout(() => {
			toasts.update((all) => all.filter((t) => t !== toast));
		}, toast.timeout);
	}
};
