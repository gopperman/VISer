import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import { timeScale, verticalScale } from '../util/scales'
import { getWidth, dimensions } from '../util/dimensions'
import { slashedTime } from '../util/time'
import { exportSVG } from '../util/dom'

class SparkLine extends Component {

	draw (el, d) {
		const container = d3.select('#sparkline'),
			width = parseInt(getWidth(container), 10),
			height = width * .75,
			x = timeScale(width),
			y = verticalScale(height),
			parseTime = slashedTime, // TODO: Detect date format
			{ margin } = dimensions

			this.setState( {width: width} )

		let array = _.map(d, (v) => {
			const time = parseTime(v.shift())
			return [time, ...v]
		})
		const labels = array.shift(),
			data = array

		const valueLine = d3.line()
			/** 
			 * Alternatively:
			 * d3.curveStep[Before,After]
			 * d3.curveBasis
			 * d3.curveCardinal
			 * d3.curveCatmullRom
			 * d3.curveMonotoneX
			 */
			.curve(d3.curveBasis)
			.x((d) => {
				return x(d[0]) 
			})
			.y((d) => { 
				return y(d[1]) 
			})
		
		const svg = container.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")")

		// Scale the range of the data
		x.domain(d3.extent(data, (d) => { return d[0] }))

		// Bind vertical axis to the data's minimum and maximum
		y.domain([
			d3.min(data, (d) => { return d[1] }), 
			d3.max(data, (d) => { return d[1] })
		])

		// Add the line path.
		svg.append("path")
			.data([data])
			.attr("class", "sparkline")
			.attr("d", valueLine)
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 4)
			.attr('fill', 'none')

		// Add the X Axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))

	 	// Add the Y Axis
		svg.append("g")
			.call(d3.axisLeft(y));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.data !== this.props.data) {
			document.getElementById('sparkline').innerHTML = ''
			this.draw('#sparkline', this.props.data)
			exportSVG('sparkline', 'export__textarea')
		}	
	}

	componentDidMount() {
		this.draw('#sparkline', this.props.data)
		exportSVG('sparkline', 'export__textarea')
	}

	render() {
		return (
			<div className="graph__container">
				<div className="sparkline graph" id="sparkline"></div>
			</div>
		)
	}
}

SparkLine.propTypes = {
	data: PropTypes.object.isRequired,
}

export default SparkLine