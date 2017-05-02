
var ConnectionFactory = (function(){
    const version = 5;
    const dbName = 'aluraframe';
    const stores = ['negociacoes'];
    
    var connection;
    var close;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Esta classe não pode ser instanciada.");
        }

        static getConnection() {
            
            return new Promise((resolve, reject) => {
                let requestOpen = window.indexedDB.open(dbName);
                
                requestOpen.onupgradeneeded = event => {
                    ConnectionFactory._createStores(event.target.result);
                }
                
                requestOpen.onsuccess = event => {
                    if (!connection) {
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () =>{
                            throw new Error("Favor encerrar a conexão pelo metodo ConnectionFactory.__close()");
                        }
                    }
                    resolve(connection);
                }

                requestOpen.onerror = event => {
                    console.log(event.target.error);
                    reject(event.target.error.name);
                }
            }); 

        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);    
                }
                connection.createObjectStore(store, {"autoIncrement" : true});
            });
        }

        static close() {
            if (connection) {
                close();
                connection = null;
            }
        }

    }
})();

