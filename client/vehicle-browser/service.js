const apiUrl = 'https://server-axcaytnuji.now.sh';

export function getVehicles() {
    return getJson(apiUrl + '/vehicles');
}

export function getVehicleDetails(id) {
    return getJson(apiUrl + '/vehicles/' + id);
}

export function reserveVehicle(id) {
    const data = { vehicleId: id };

    return post(apiUrl + '/reserve', data)
        .then(resp => ({
            orderPlacedAt: resp.orderPlacedAt, 
            error: (resp.validationError || resp.error)
        }));
}

const validateResponse = (resp) => {
    if (!resp.ok) throw Error(resp.statusText);
    
    return resp.json();
}

const handleErrors = (error) => ({error: error.message});

const getJson = (url) => fetch(url)
    .then(validateResponse)
    .catch(handleErrors);

const post = (url, data) => {
    const req = {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(url, req)
        .then(validateResponse)
        .catch(handleErrors);
}
