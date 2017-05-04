class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = event => {
                resolve();
            }

            request.onerror = event => {
                console.log(event.target.error);
                reject("Erro ao inserir a negociação");
            }

        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .openCursor();

                let negociacoes = [];

                cursor.onsuccess = e => {
                    let cursor = e.target.result;
                    if (cursor) {
                        let obj = cursor.value;
                        negociacoes.push(new Negociacao(new Date(obj._data), obj._quantidade, obj._valor));
                        cursor.continue();
                    } else {
                        resolve(negociacoes);
                    }
                }

                cursor.onerror = e => {
                    console.log(e.target.error);
                    reject("Erro ao pegar dados para listagem");
                }
        });
    }

}