class DateHelper {

	constructor() {
		throw new Error("DateHelper não pode ser instanciada.");
	}

	static textToDate(text) {
		
		if(!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
			throw new Error("Formato deve ser yyyy-mm-dd.");
		}

		return new Date(
			...text.split('-').map((num, index) => num - (index % 2)) 
		);
	}

	static dateToText(data){
		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
	}
}
