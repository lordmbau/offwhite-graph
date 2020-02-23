const list = (root, args, { data }) => {
  return data.line_planning
}

const single = (root, { id }, { data }) => {
  return data.line_planning.find(rep => rep.id === id)
}

export {
  list,
  single,
}