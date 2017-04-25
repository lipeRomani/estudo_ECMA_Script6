class ListaNegociacoes {
	constructor() {
		this._negociacoes = [];
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);
	}

	clear() {
		this._negociacoes = [];
	} 

	get negociacoes() {
		return [].concat(this._negociacoes);
	}

	getVolumeTotal() {
		return this._negociacoes.reduce((total, neg) => total + neg.volume, 0.0);
	}
}