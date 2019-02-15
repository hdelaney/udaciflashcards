export const INITIALIZE_DATA = 'INITIALIZE_DATA';

export function initializeData (data) {
	return {
		type: INITIALIZE_DATA,
		data
	}
}