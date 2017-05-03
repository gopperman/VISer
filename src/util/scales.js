import { dimensions } from './dimensions'
import * as d3 from 'd3'

const timeScale = d3.scaleTime().range([0, dimensions.width])
const verticalScale = d3.scaleLinear().range([dimensions.height, 0])

export { timeScale, verticalScale }