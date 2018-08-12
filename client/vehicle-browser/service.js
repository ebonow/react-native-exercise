const apiUrl = 'http://192.168.2.102:3000';

export function getVehicles() {
    const url = apiUrl + '/vehicles';

    return getJson(url);
}

export function getVehicleDetails(id) {
    const url = apiUrl + '/vehicles/' + id;
    
    return getJson(url);
}

export function orderVehicle(req) {
    const url = apiUrl + '/reserve';

    return post(url, req);
}

const handleErrors = (resp) => {
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    return resp.json();
}

export function test() {
    const url = apiUrl + '/test';
    return getJson(url);
}

const getJson = (url) => fetch(url)
    .then(handleErrors)
    .catch(error=>({error: url + ': ' + error.message}));


const post = (url, req) => {}
