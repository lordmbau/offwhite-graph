import {
  list as airplanes,
  single as airplane
} from "./airplanes"

const nested = {}


const Query = {
  hello: () => "Hello, world",

  airplanes,
  airplane
}

export {
  Query,
  nested,
}