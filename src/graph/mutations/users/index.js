import { ObjectId } from "mongodb"
import sha1 from "sha1"
const { name } = require("./about.js")

const { UserError } = require("graphql-errors");

const create = async (data, { db: { collections } }) => {
  const id = new ObjectId().toHexString();
  const entry = Object.assign(data[name], { id, password: sha1("loginpass"), isDeleted: false });

  try {
    const user = await collections[name].findOne({ where: { phone: entry.phone, isDeleted: false }})

    if(!user){
      await collections[name].create(entry);

      return entry;
    } else {
      throw new UserError(`User with contact ${entry.phone} already exists`)
    }
  } catch (err) {
    throw new UserError(err.details);
  }
};

const update = async (data, { db: { collections } }) => {
  const { id, password } = data[name];
  const entry = Object.assign(data[name], password && { password: sha1(password) });

  try {
    delete entry.id;

    await collections[name].update({ id }).set(entry);

    return {
      id
    };
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
    console.log(err)
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
