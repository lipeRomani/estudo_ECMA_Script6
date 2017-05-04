class DateHelper {

	constructor() {
		throw new Error("DateHelper não pode ser instanciada.");
	}

	static textToDate(text) {
		
		if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) {
			throw new Error("Formato deve ser yyyy-mm-dd.");
		}

		return new Date(
			...text
			.split('/')
			.reverse()
			.map((num, index) => num - (index % 2)) 
		);
	}

	static dateToText(data){
		let monthDate = data.getMonth() + 1;
		let dia = /^\d{1}$/.test(data.getDate()) ? `0${data.getDate()}` : data.getDate();
		let mes = /^\d{1}$/.test(monthDate) ? `0${monthDate}` : monthDate;
		return `${dia}/${mes}/${data.getFullYear()}`;
	}
}
