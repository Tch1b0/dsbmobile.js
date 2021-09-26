export function parseDate(rawDate: string): Date {
	let rawSplitDate = rawDate.split(" ");
	let rawActualDateSplit = rawSplitDate[0].split(".");
	let rawTimeSplit = rawSplitDate[1].split(":");

	return new Date(
		Number(rawActualDateSplit[2]),
		Number(rawActualDateSplit[1]) - 1,
		Number(rawActualDateSplit[0]),
		Number(rawTimeSplit[0]),
		Number(rawTimeSplit[1])
	);
}
