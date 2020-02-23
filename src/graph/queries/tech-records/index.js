const list = (root, args, { data }) => {
  return data.tech_records
}

const single = (root, { id }, { data }) => {
  return data.tech_records.find(rep => rep.id === id)
}

const nested = {
  TechRecord: {
    materials: (root, args, { data }) => {
      return data.materials.filter(material => root.materials.includes(material.id))
    }
  }
}

export {
  list,
  single,
  nested
}