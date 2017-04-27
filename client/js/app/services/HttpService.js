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
}