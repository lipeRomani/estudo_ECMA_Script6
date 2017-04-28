class HttpService {
    
    get(url) {
        let xhr = new XMLHttpRequest()
        
        return new Promise((resolve, reject) => {
            xhr.open("GET", url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log("erro no http");
                        reject("Erro ao importar");
                    }
                }
            }
        xhr.send();
        });   
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }

            xhr.send(JSON.stringify(dado));
        });

        
    }
}