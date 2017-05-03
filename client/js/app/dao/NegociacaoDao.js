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

}