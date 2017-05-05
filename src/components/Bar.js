import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import CopyButton from './CopyButton'
import { getWidth, dimensions } from '../util/dimensions'
import { colors } from '../util/colors'

class Bar extends Component {
	id = _.uniqueId('bar-')

	draw () {
		const container = d3.select(`#${this.id}`),
			data = this.props.data,
			width = parseInt(getWidth(container), 10),
			{ margin } = dimensions,
			barHeight = 30,
			height = barHeight * data.length,
			x = d3.scaleLinear()
    			.range([0, width]),
    		y = d3.scaleBand()
	          .range([height, 0])
	          .padding(0.1),
			svg = container.append('svg')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");

			y.domain(data.map( (d) => d[0]))
			x.domain([0, d3.max(data, (d) => d[1])])

			const bars = svg.selectAll(".bar")
					.data(data)
				.enter().append('g')
					.attr('class', 'bar')
					.attr('y', (d) => y(d[0]))
					.attr('height', y.bandwidth())

			bars.append('rect')
				.attr('class', 'background')
				.attr('fill', '#ddd')
				.attr('y', (d) => y(d[0]))
				.attr('height', y.bandwidth())
				.attr('width', width)

			bars.append('rect')
				.attr('y', (d) => y(d[0]))
				.attr('width', (d) => x(d[1]))
				.attr('fill', colors[0])
				.attr('height', y.bandwidth())

			// Labels
			bars.append('text')
				.text(function(d) { return d[0] })
				.attr('fill', 'white')
				.attr('font-size', '12px')
				.attr('class', 'name')
				.attr('y', (d) => (y(d[0]) + y.bandwidth()*.6))
				.attr('x', 5)

			// Mean Tick
    		const mean = d3.mean(data, function(d) { return d[1]; });

			bars.append('line')
				.attr('class', 'mean')
				.attr('stroke', '#222')
				.attr('x1', x(mean))
				.attr('x2', x(mean))
				.attr('y1', (d) => y(d[0]))
				.attr('y2', (d) => (y(d[0]) + y.bandwidth()))
			// X-Axis
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))

			svg.append("g")
				.call(d3.axisTop(x));  
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
				<h3 className="graph__title">Bar</h3>
				<div className="bar graph" id={this.id}></div>
				<CopyButton source={this.id} />
			</div>
		)
	}
}

Bar.propTypes = {
	data: PropTypes.array.isRequired,
}

export default Bar