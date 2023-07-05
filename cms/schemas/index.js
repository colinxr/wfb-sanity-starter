// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

import blockContent from "./blockContent"
// import category from './category'
// import post from './post'
// import author from './author'
import home from "./singletons/home"
import settings from "./singletons/settings"

export const schemaTypes = [home, settings]
