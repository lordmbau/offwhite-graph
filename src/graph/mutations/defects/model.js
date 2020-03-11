var Waterline = require("waterline");
const { name: identity } = require("./about.js")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    pilot: { type: "string", required: true },
    description : { type: "string", required: true },
    full_description: { type: "string" },
    maintenance_description: { type: "string" },
    manual: { type: "string" },
    airplane: { type: "string", required: true },
    status: { type: "string", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
});
