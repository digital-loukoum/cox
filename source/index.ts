import { derived, Readable, writable } from "svelte/store"

export function useLocales<Locales extends string>(current: Locales) {
	const currentLocale = writable(current)

	return {
		currentLocale,
		useContent: <T>(content: { [key in Locales]: T }): Readable<T> =>
			derived(currentLocale, locale => content[locale]),
	}
}
