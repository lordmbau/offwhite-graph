import Waterline from "waterline"
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    part_no: { type: "string", required: true },
    serial_no: { type: "string", required: true },
    airplane: { type: "string" },
    isDeleted: { type: 'boolean', defaultsTo: false }
  }
})