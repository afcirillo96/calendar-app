const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    //para q use los endpoints q creamos en 10-backend, por defecto viene GET

    const url = `${ baseUrl }/${ endpoint }`; //localhost:4000/api/...

    if ( method === 'GET' ) {//si es GET
        return fetch(url);
    } else {                 //si no es GET
        return fetch( url, {//esto es como usar Postman
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}


export const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    //para q use los endpoints q creamos en 10-backend, por defecto viene GET

    const url = `${ baseUrl }/${ endpoint }`; //localhost:4000/api/...
    const token = localStorage.getItem('token') || '';//token lo tomamos del localStorage

    if ( method === 'GET' ) {//si es GET
        return fetch(url, {
            method,
            headers: {
                'x-token': token    //le mandamos el token
            }
        });

    } else {                 //si no es GET
        return fetch( url, {//esto es como usar Postman
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token    //le mandamos el token
            },
            body: JSON.stringify( data )
        });
    }
}