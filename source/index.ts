import { derived, Readable, writable } from "svelte/store"

export function defineLocales<Locales extends string>(current: Locales) {
	const currentLocale = writable(current)

	return {
		currentLocale,
		defineContent: <T>(content: { [key in Locales]: T }): Readable<T> =>
			derived(currentLocale, locale => content[locale]),
	}
}
