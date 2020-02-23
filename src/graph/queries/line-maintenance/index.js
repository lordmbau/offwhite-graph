const list = (root, args, { data }) => {
  return data.line_maintenance
}

const single = (root, { id }, { data }) => {
  return data.line_maintenance.find(rep => rep.id === id)
}

const nested = {
  LineMaintenance: {
    lp: (root, args, { data }) => {
      return data.line_planning.find(plan => plan.id === root.lp)
    }
  }
}

export {
  list,
  single,
  nested
}