require("dotenv").config()
import "graphql-import-node"
import "babel-polyfill"

import express from "express"
import { makeExecutableSchema } from "graphql-tools"
import graphqlHTTP from "express-graphql"
import { importSchema } from 'graphql-import'

import resolvers from "./graph"

const typeDefs = importSchema('./schema.graphql')
let schema = makeExecutableSchema({ typeDefs, resolvers });

var router = express.Router()

router.use(
  "/graph", (req, res, next) => {
    return graphqlHTTP({
      schema,
      graphiql: true,
      context: {
        user: req.user,
        db: req.app.locals.db
      }
    })(req, res, next)
  }
);

export default router;
