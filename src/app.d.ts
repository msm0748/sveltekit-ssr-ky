// See https://kit.svelte.dev/docs/types#app

import type { KyInstance } from 'ky';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			api: KyInstance;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
