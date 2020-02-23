const list = (root, args, { data }) => {
  return data.pirep
}

const single = (root, { id }, { data }) => {
  return data.pirep.find(rep => rep.id === id)
}

export {
  list,
  single
}