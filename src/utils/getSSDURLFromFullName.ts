export const getSSDUrlFromFullName = (fullName: string): string => {
	const baseUrl = 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=';
	const nameParts = fullName.split(' ');

	if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
		return baseUrl + nameParts[0];
	} else {
		return baseUrl + fullName.replaceAll(' ', '%20');
	}
};