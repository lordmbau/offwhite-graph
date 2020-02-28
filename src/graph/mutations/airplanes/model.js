import Waterline from "waterline"
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    fleet: { type: "string", required: true },
    reg_no: { type: "string", required: true },
    isDeleted: { type: 'boolean', defaultsTo: false }
  }
})