import { portableTextToHtml } from 'astro-sanity'
import { urlFor } from './helpers.js'

const customComponents = {
	types: {
		mainImage: ({ value }) => {
			return `
        <picture>
          <source
            srcset="${urlFor(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${urlFor(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `
		},
		image: ({ value }) => {
			return `
        <picture>
          <source
            srcset="${urlFor(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${urlFor(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `
		},
		code: ({ value }) => {
			return `<code-block code='${value.code}' language='${value.language}'></code-block>`
		},
	},
}

export const sanityPortableText = portabletext =>
	portableTextToHtml(portabletext, customComponents)
