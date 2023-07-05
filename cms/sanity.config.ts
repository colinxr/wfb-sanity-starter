import { config } from 'dotenv'
config()

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["Home", "Settings"])

export default defineConfig({
  name: 'default',
  title: 'Starter CMS',

  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',

  plugins: [deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([

            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Home")
              .id("home")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .title('Homepage')
                  .schemaType("home")
                  .documentId("home")
              ),
            
            S.listItem()
              .title("Global Settings")
              .id("settings")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .title('Global Settings')
                  .schemaType("settings")
                  .documentId("settings")
              ),

            // Regular document types
            // S.documentTypeListItem("blogPost").title("Blog Posts"),
            // S.documentTypeListItem("author").title("Authors"),
          ]),
    }
  ), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,

    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const {getClient, dataset, document} = context
      const client = getClient({apiVersion: '2023-05-31'})

      // if (document._type === 'post') {
      //   const slug = await client.fetch(
      //     `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
      //     {postId: document._id}
      //   )

      //   const params = new URLSearchParams()
      //   params.set('preview', 'true')
      //   params.set('dataset', dataset)
        
      //   return slug ? `https://luminoso.vercel.app/${slug}?${params}` :
      //     `https://luminoso.vercel.app?${params}`
          
      // } 

        // const slug = await client.fetch(
        //   `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
        //   {postId: document._id}
        // )

        const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)
        
        return `https://luminoso.vercel.app?${params}`
          

      return prev
    }
  },
})
