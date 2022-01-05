# cox-svelte

Cox is an modern fully-typed Typescript library to handle internationalisation.

Cox-svelte is an adapter of the Cox library for the front-end framework Svelte.

Comparing to standard internationalisation libraries, it has the following features:

- **type safe**. Using Typescript, Cox ensures that you have no missing key for any locale at any moment. Even when dealing with many languages, you can deploy in production with confidence: you'll never make a mistake again.
- **no string key**. Standard internationalisation libraries use this kind of syntax to get a content value: `$t('unsafe.path.to.my.key')`. It is error-prone, very annoying to write and not typed. With Cox, you'll write something like: `$content.safe.path.to.my.key`, with auto-completion and the right typing.
- **use functions instead of templates**. There are so many languages, dealing with plural, feminine/masculine, and other stuff is very complex. It's actually so complex there is no simple and magic template language that can do it all. Cox is developper-oriented and instead of implementing a complex template language, it lets the developper decide how to to deal with edge cases. The use of the natively embedded `Intl` library is highly encouraged along Cox.
- **not one huge translation file**. Instead of having one huge `en.json` file for every language, Cox promotes the use of multiples smaller translation files. Typically, you would apply content per-component instead of globally. This improves drastically the developper experience.

### When to use and when to not use

Cox is a perfect choice when you develop an application with few languages (maximum 4-5 languages).

I you need to develop a product that will be translated **a lot** of languages, Cox is not recommended. For these use cases, we advice to use a software with an integrated graphical user interface like Weblate.

## Usage

First, let's create a configuration file that describes all the languages we will implement.

```ts
/* src/locales.ts */
import { defineLocales } from "cox-svelte"

/**
 * We want to implement two languages: english and french.
 * We also indicate that english is the default language.
 */
export const { defineContent, currentLocale } = defineLocales<"en" | "fr">("en")
```


Then let's define a **content file**. A content file can contains anything, as long as it contains the *same type of data for every locale to implement*.

For that, we use the `defineContent` function that has just been returned:

```ts
/* src/content.ts */
import { defineContent } from "./locales"

export const content = defineContent({
  en: {
    sayHelloToWorld: `Hello world!`,
    sayHelloTo: (helloTo: string) => `Hello ${helloTo}!`
  },
  fr: {
    sayHelloToWorld: `Bonjour le monde !`,
    sayHelloTo: (helloTo: string) => `Bonjour ${helloTo} !`
  },
})
```

Great, now we can use our newly defined content in our svelte components:

```svelte
<!-- src/component.svelte -->
<script lang="ts">
  import { content } from './content'
</script>

<p>
  { $content.sayHelloToWorld }
</p>

<p>
  { $content.sayHelloTo('magnificent you') }
</p>
```


### Changing current locale

`currentLocale` is a writable store so it is very easy to change it programmatically:

```ts
import { currentLocale } from "./locales"

currentLocale.set("fr")
```

Alternatively if you are inside a `.svelte` file you can use the store syntax:

```ts
$currentLocale = "fr"
```

Thanks to the magic of stores, this will automatically update *all content data* in the entire application.


## Note on architecture

Cox promotes the use of one content file per component. This is ideal for codebases that will scale. As a developer, you won't get lost with one humongous json translation file.

Not all components should have their respective content file though. For example, if you follow the [atomic design methodology](https://atomicdesign.bradfrost.com/chapter-2/):

- `atoms` and `molecules` should not be related to a content file,
- `organisms` and `templates` can be related to a content file,
- `pages` should not be related to a content file - as they import templates and organisms that have this responsibility.
