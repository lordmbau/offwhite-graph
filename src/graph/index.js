import { Query, nested } from "./queries"

const root = {
  Query
}

export default Object.assign(root, nested)