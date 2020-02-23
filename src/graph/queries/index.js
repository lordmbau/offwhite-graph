import {
  list as pireps,
  single as pirep
} from "./pirep"

import {
  list as line_plans,
  single as line_plan
} from "./line-planning"

import {
  list as materials,
  single as material
} from "./materials"

import {
  list as line_maintenances,
  single as line_maintenance,
  nested as Nlinemaintenance
} from "./line-maintenance"

import {
  list as tech_records,
  single as tech_record,
  nested as Ntechrecord
} from "./tech-records"

const nested = {}

Object.assign(
  nested,
  Nlinemaintenance,
  Ntechrecord
)

const Query = {
  hello: () => "Hello, world",

  pireps,
  pirep,

  line_plans,
  line_plan,

  materials,
  material,

  line_maintenances,
  line_maintenance,

  tech_records,
  tech_record
}

export {
  Query,
  nested,
}