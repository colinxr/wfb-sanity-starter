import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      title: 'Content Blocks',
      name: 'content_blocks',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'splitHero'},
          { type: 'imageWithBullets', },
          { type: 'photoBurst', },
          { type: 'textWithSideImage', },
        ]
      }]
    })
  ],
})
