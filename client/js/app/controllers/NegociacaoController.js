class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._view = new NegociacoesView($('#neg-table'));
		this._messageView = new MensagemView($('#mensagem'));

		this._listaNegociacoes = new ListaNegociacoes((model, message) => {
			this._view.update(model);
			this._messageView.update(new Mensagem(message));
		});

		this._view.update(this._listaNegociacoes.negociacoes);
		
	}

	adiciona(event) {
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
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
