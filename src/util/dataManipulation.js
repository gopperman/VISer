import _ from 'lodash'

/**
 * Does a series of transformations on an array of data to see what it's made of
 * @param  {[type]} data [description]
 * @return {object} some helpful facts about the data
 */
const analyzeData = (data) => {
	return {
		columns: 0,
		rows: 0,
		keyType: "time" // 'time' | 'string' | 'number'
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