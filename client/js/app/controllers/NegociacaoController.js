class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#neg-table')), "adiciona", "clear", "ordena", "inverteOrdem");
		this._message = new Bind(new Mensagem(), new MensagemView($('#mensagem')), 'text');	
		this._negociacaoService = new NegociacaoService(new HttpService());

		this._ordemAtual = "";

		ConnectionFactory
			.getConnection()
			.then(con => new NegociacaoDao(con))
			.then(dao => dao.listaTodos())
			.then(negociacoes => 
					negociacoes.forEach((neg) => 
							this._listaNegociacoes.adiciona(neg)))
			.catch(err => {
				console.log(err);
				this._message = "Erro ao carregar listagem";
			}); 
	}

	adiciona(event) {
		event.preventDefault();

		let connection = ConnectionFactory.getConnection();
		let negociacao = this._criaNegociacao();

		connection
			.then(conn => {
				new NegociacaoDao(conn)
				.adiciona(negociacao)
				.then(() => {
					this._listaNegociacoes.adiciona(negociacao);
					this._message.text = "Criado com sucesso.";
					this._limpaFormulario();
				});
			})
			.catch(err => this._message.text = err);
	}

	importa() {
		this._negociacaoService
			.obterNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach((element) => {
					console.log(element);
					this._listaNegociacoes.adiciona(element);
					this._message.text = "Importação realizada com sucesso";
				});
			})
			.catch(err => this._message.text = err);
	}

	limpar() {
		ConnectionFactory
			.getConnection()
			.then(con => new NegociacaoDao(con))
			.then(dao => dao.apagarTodos())
			.then(message => { 
				this._message.text = message;
				this._listaNegociacoes.clear();
			})
			.catch(err => this._message.text = err);
	}

	ordena(coluna) {
		if (this._ordemAtual === coluna) {
			this._listaNegociacoes.inverteOrdem();	
		} else {
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	}

	_criaNegociacao() {
		return new Negociacao(
				DateHelper.textToDate(this._inputData.value),
				parseInt(this._inputQuantidade.value),
				parseFloat(this._inputValor.value)
			);
	}

	_limpaFormulario() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}

}
