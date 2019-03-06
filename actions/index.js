import { INITIALIZE_DATA } from './actionTypes';

export function initializeData (data) {
	return {
		type: INITIALIZE_DATA,
		data
	}
}