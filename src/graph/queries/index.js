import {
  list as airplanes,
  single as airplane
} from "./airplanes"

import {
  list as departments,
  single as department,
  nested as Ndepartment
} from "./departments"

import {
  list as users,
  single as user,
  nested as Nuser
} from "./users"

const nested = {}

Object.assign(
  nested,
  Ndepartment,
  Nuser
)

const Query = {
  hello: () => "Hello, world",

  airplanes,
  airplane,

  departments,
  department,

  users,
  user
}

export {
  Query,
  nested,
}