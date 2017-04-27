class NegociacaoService {

    constructor(httpService) {
        this._httpService = httpService;
    }

    importaSemana() {
            return this._httpService.get("/negociacoes/semana")
                .then((data) => {
                    return data.map((element) => new Negociacao(new Date(element.data), element.quantidade, element.valor));
                })
                .catch((err) => {
                    throw new Error(err);
                });
    }

    importaSemanaAnterior() {
        
           return this._httpService.get("/negociacoes/anterior")
                .then(dataArray => {
                    return dataArray.map((element) => new Negociacao(new Date(element.data), element.quantidade, element.valor));
                })
                .catch(err => {
                    throw new Error(err)
                });
    }

    importaSemanaRetrasada() {
            return this._httpService.get("/negociacoes/retrasada")
                .then(dataArray => {
                    return dataArray.map(element => new Negociacao(new Date(element.data), element.quantidade, element.valor));
                })
                .catch(err => {
                    throw new Error(err);
                });
    }

    obterNegociacoes() {
        return Promise.all([
			this.importaSemana(),
			this.importaSemanaAnterior(),
			this.importaSemanaRetrasada()
		])
		.then(dataArray => {
			return dataArray
				.reduce((newArray, array) => newArray.concat(array), []);
		})
		.catch(err => {
            throw new Error(err);
        });
    }

}