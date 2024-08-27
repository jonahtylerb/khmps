import { writable } from 'svelte/store';

export type Task = {
	id: string;
	title: string;
	due: string;
	completed: string;
	assignedTo: { id: string; name: string };
};

export type User = {
	id: string;
	name: string;
	email: string;
	phone: string;
	cong: string;
	skills: string[];
	adminCode: string;
	kingdomHall?: { name: string; id: string } | string;
};

export const tasksStore = writable<Task[]>([]);
export const usersStore = writable<User[]>([]);
export const userStore = writable<User>();
