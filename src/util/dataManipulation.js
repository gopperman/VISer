import _ from 'lodash'
import { slashedTime } from './time'
/**
 * Does a series of transformations on an array of data to see what it's made of
 * @param  {[type]} data [description]
 * @return {object} some helpful facts about the data
 */
const analyzeData = (data) => {
	const sample = _.get(data, '[0][0]')

	return {
		columns: (data.length > 0) ? data[0].length : 0,
		rows: data.length,
		isDate: slashedTime(sample) !== null
	}
}

/**
 * Converts a raw string of CSV data to an array
 * @param  {string} data 
 * @return {array}      
 */
const csvToArray = (data) => {
	let array = []
	if (data.includes(',') ) {
		array = _.compact(data.split('\n')).map((row) => {
			if ( row !== '') {
				return row.split(',')
			}
			return null
		})
	}
	return array
}

export { analyzeData, csvToArray }