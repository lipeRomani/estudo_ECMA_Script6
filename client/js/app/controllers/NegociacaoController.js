class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._viewNeg = new NegociacoesView($('#neg-table'));
		this._messageView = new MensagemView($('#mensagem'));

		this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'clear'] ,model => this._viewNeg.update(model));
		this._viewNeg.update(this._listaNegociacoes);

		this._message = ProxyFactory.create(new Mensagem(), ['text'], model => this._messageView.update(model));
		this._messageView.update(this._message);	
				
	}

	adiciona(event) {
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._message.text = "Criado com sucesso.";
		this._limpaFormulario();
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
