import { ObjectId } from "mongodb"
const { name } = require("./about")

const { UserError } = require("graphql-errors");

const create = async (data, { db: { collections }, user: { id: author } }) => {
  const id = new ObjectId().toHexString();
  const statusId = new ObjectId().toHexString()
  const entry = Object.assign(data[name], { id, isDeleted: false, status: statusId });
  const status = { id: statusId, author, type: "NEW" }

  try { 
    await collections[name].create(entry);
    await collections["status"].create(status)

    return entry;
  } catch (err) {
    throw new UserError(err.details);
  }
};

const update = async (data, { db: { collections } }) => {
  const { id } = data[name];
  const entry = Object.assign({}, data[name]);

  try {
    delete entry.id;

    await collections[name].update({ id }).set(entry);

    return entry;
  } catch (err) {
    throw new UserError(err.details);
  }
};

const archive = async (data, { db: { collections } }) => {
  const { id } = data[name];

  try {
    await collections[name].update({ id }).set({ isDeleted: true });

    return {
      id
    };
  } catch (err) {
    throw new UserError(err.details);
  }
};

const restore = async (data, { db: { collections } }) => {
  const { id } = data[name];

  try {
    await collections[name].update({ id }).set({ isDeleted: false });

    return {
      id
    };
  } catch (err) {
    throw new UserError(err.details);
  }
};

export default () => {
  return {
    create,
    update,
    archive,
    restore
  };
};
