import { defineLocales } from "../source"

const { defineContent, currentLocale } = defineLocales<"fr" | "en">("en")

const content = defineContent({
	fr: {
		sayHello: (name: string) => `Bonjour ${name} !`,
	},
	en: {
		sayHello: (name: string) => `Hello ${name}!`,
	},
})

content.subscribe(value => {
	console.log(value.sayHello("Foo"))
})

setTimeout(() => currentLocale.set("fr"), 1000)
setTimeout(() => currentLocale.set("en"), 2000)
