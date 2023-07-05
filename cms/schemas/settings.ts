import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'footer_heading',
      title: 'Footer Heading Text',
      type: 'string',
    }),

    defineField({
      name: 'footer_body',
      title: 'Footer Body Text',
      type: 'text', 
    }),

    defineField({
      name: 'seo_description',
      title: 'SEO Meta Description',
      type: 'string',
    }),

    defineField({
      name: 'seo_image',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Image that appears when shared on social media'
    }),
  ],
})
