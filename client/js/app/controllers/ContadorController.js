class ContadorController {
	constructor(elementId) {
		let $ = document.querySelector.bind(document);
		this._elementUpdate = $(elementId);
		this._total = 0;
	}

	increment(num) {
		this._total += num;
		this._elementUpdate.textContent = this._total;
	}
}