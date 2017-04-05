class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = new Negociacao(
				DateHelper.textToDate(this._inputData.value),
				this._inputQuantidade.value,
				this._inputValor.value	
			);

		console.log(DateHelper.dateToText(negociacao.data));
	}

}
