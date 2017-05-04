import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import CopyButton from './CopyButton'
import { getWidth } from '../util/dimensions'
import { colors } from '../util/colors'

class Donut extends Component {
	id = _.uniqueId('donut-')

	draw () {
		const container = d3.select(`#${this.id}`),
			width = parseInt(getWidth(container), 10),
			height = width * .75,
			radius = Math.min(width, height) / 2,

			arc = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(radius - 100),

			pie = d3.pie()
				.sort(null)
				.value( (d) => { 
					return d[1]
				})
		console.log('colors')
		console.log(colors);
		// Abstract Me!
		const color = d3.scaleOrdinal()
		    .range(colors)

		const svg = container.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

		// Check out this chaining and entering:
		const  g = svg.selectAll(".arc")
		      .data(pie(this.props.data))
		.enter().append("g")
			.attr("class", "arc")

		//Fill that donut up
		g.append("path")
			.attr("d", arc)
			.style("fill", (d) => {
				return color(d.data[0])
			})

		//Apply Labels
		g.append("text")
			.attr("transform", (d) => { 
				return "translate(" + arc.centroid(d) + ")" 
			})
			.attr("dy", ".35em")
			.text(function(d) {
				return d.data[0]
			})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.data !== this.props.data) {
			document.getElementById(`${this.id}`).innerHTML = ''
			this.draw()
		}	
	}

	componentDidMount() {
		this.draw()
	}

	render() {
		return (
			<div className="graph__container">
				<h3 className="graph__title">Donut</h3>
				<div className="donut graph" id={this.id}></div>
				<CopyButton source={this.id} />
			</div>
		)
	}
}

Donut.propTypes = {
	data: PropTypes.array.isRequired,
}

export default Donut