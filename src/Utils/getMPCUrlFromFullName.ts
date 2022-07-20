export const getMPCUrlFromFullName = (fullName: string): string => {
	const baseUrl = 'https://minorplanetcenter.net/db_search/show_object?object_id=';
	const nameParts = fullName.split(' ');

	if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
		return baseUrl + nameParts[0];
	} else {
		return baseUrl + fullName.replaceAll(' ', '+');
	}
};