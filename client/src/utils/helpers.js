import { useSanityClient, createImageBuilder } from 'astro-sanity'

const builder = createImageBuilder(useSanityClient())

export const urlFor = source => builder.image(source)
