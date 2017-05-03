import * as d3 from 'd3'

const timeScale = (width) => 
	d3.scaleTime().range([0, width])
const verticalScale = (height) =>
	d3.scaleLinear().range([height, 0])

export { timeScale, verticalScale }