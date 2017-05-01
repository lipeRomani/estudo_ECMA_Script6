var version = 5;
var dbName = 'aluraframe';
var stores = ['negociacoes'];

class ConnectionFactory {

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
                resolve(resolve);
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

}