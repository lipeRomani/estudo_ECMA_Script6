class ListaNegociacoes {
	constructor(trigger) {
		this._negociacoes = [];
		this._triggerUpdateView = trigger;
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);
		this._triggerUpdateView(this._negociacoes, "Negociação adicionada com sucesso");
	}

	clear() {
		this._negociacoes = [];
		this._triggerUpdateView(this._negociacoes, "Lista removida com sucesso.")
	} 

	get negociacoes() {
		return [].concat(this._negociacoes);
	}
}