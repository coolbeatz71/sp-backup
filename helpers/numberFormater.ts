function formatNumber(num: number | string): string {
	const newNumber = Number(num);
	const formattedNumber = newNumber
		.toFixed(2)
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	return formattedNumber;
}

export default formatNumber;
