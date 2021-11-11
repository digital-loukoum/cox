import { useLocales } from "../source"

const { useContent, currentLocale } = useLocales<"fr" | "en">("en")

const content = useContent({
	fr: {
		sayHello: (name: string) => `Bonjour ${name} !`,
	},
	en: {
		sayHello: (name: string) => `Hello ${name}!`,
	},
})

content.subscribe(value => {
	console.log(value.sayHello("Coco"))
})

setTimeout(() => currentLocale.set("fr"), 1000)
setTimeout(() => currentLocale.set("en"), 2000)
