class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#neg-table')), "adiciona", "clear");
		this._message = new Bind(new Mensagem(), new MensagemView($('#mensagem')), 'text');	
		this._negociacaoService = new NegociacaoService(new HttpService());
	}

	adiciona(event) {
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._message.text = "Criado com sucesso.";
		this._limpaFormulario();
	}

	importa() {
		this._negociacaoService
			.obterNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach((element) => {
					this._listaNegociacoes.adiciona(element);
					this._message.text = "Importação realizada com sucesso";	
				});
			})
			.catch(err => this._message.text = err);
	}

	limpar() {
		this._listaNegociacoes.clear();
	}

	_criaNegociacao() {
		return new Negociacao(
				DateHelper.textToDate(this._inputData.value),
				this._inputQuantidade.value,
				this._inputValor.value	
			);
	}

	_limpaFormulario() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}

}
