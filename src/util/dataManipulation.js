import _ from 'lodash'
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

export { csvToArray }