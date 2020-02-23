const list = (root, args, { data }) => {
  return data.materials
}

const single = (root, { id }, { data }) => {
  return data.materials.find(rep => rep.id === id)
}

export {
  list,
  single,
}