const { name } = require("./about")

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
  [name]:{
    async pilot(root, args, { db: { collections }}){
      const entry = await collections["user"].findOne({ where: { id: root.pilot }})
      return entry
    },
    async status(root, args, { db: { collections }}){
      const entry = await collections["status"].findOne({ where: { id: root.status }})
      return entry
    },
    async airplane(root, args, { db: { collections }}){
      const entry = await collections["airplane"].findOne({ where: { id: root.airplane }})
      return entry
    },
    async manual(root, args, { db: { collections }}){
      const entry = await collections["manual"].findOne({ where: { id: root.manual }})
      return entry
    }
  }
}

export { list, single, listDeleted, nested };
