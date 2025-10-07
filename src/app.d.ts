// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
        	id: number;
        	username: string;
        	email: string;
        	firstName: string;
        	lastName: string;
			image: string;
      		};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
