import { Query, nested } from "./queries"
import Mutation from "./mutations"

const root = {
  Query,
  Mutation
}

export default Object.assign(root, nested)