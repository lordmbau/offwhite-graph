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

import {
  list as defects,
  single as defect,
  nested as Ndefect
} from "./defects"

import {
  list as rotables,
  single as rotable,
  nested as Nrotable
} from "./rotables"

import {
  list as statuses,
  single as status,
  nested as Nstatus
} from "./status"

const nested = {}

Object.assign(
  nested,
  Ndepartment,
  Nuser,
  Ndefect,
  Nrotable,
  Nstatus
)

const Query = {
  hello: () => "Hello, world",

  airplanes,
  airplane,

  departments,
  department,

  users,
  user,

  defects,
  defect,

  rotables,
  rotable,

  statuses,
  status
}

export {
  Query,
  nested,
}