const { name } = require("./about.js")

const list = async (root, args, { db: { collections } }) => {
  const entries = await collections[name].find({
    where: {
      isDeleted: false
    }
  });
  return entries;
};

const listDeleted = async (root, args, { db: { collections } }) => {
  const entries = await collections[name].find({
    where: {
      isDeleted: true
    }
  });
  return entries;
};

const single = async (root, args, { db: { collections } }) => {
  const { id } = args[name];

  const entry = await collections[name].findOne({
    where: { id, isDeleted: false }
  });
  return entry;
};

const nested = {
  [name]: {
    hod: async (root, args, { db: { collections }}) => {
      const entry = await collections["user"].findOne({ where : { id: root.hod }})
      return entry
    },
    users: async (root, args, { db: { collections }}) => {
      const entries = await collections["user"].find({ where: { department: root.id }})
      return entries
    }
  }
}

export { list, single, listDeleted, nested };
