export const getCNEOSOrbitViewerUrlFromFullNameAndDate = (fullName: string, date: Date): string => {
	let designation = '';
	const nameParts = fullName.split(' ');

	if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
		designation = nameParts[0];
	} else {
		designation = fullName.replaceAll(' ', '%20');
	}

	const time = date.getTime();
	const jd = time / 86400000 + 2440587.5;
	const url = `https://cneos.jpl.nasa.gov/ca/ov/#load=&orientation=0,0,0,1&lookat=Earth&interval=2&eclipticgrid=false&eclipticaxis=false&distance=29919.57414&pitch=0&roll=0&yaw=0&scale=0.5&rotateX=-30.20870289631195&rotateY=38.134339235185024&desig=${designation}&cajd=${jd}&largeFont=true&`;
	return url;
};