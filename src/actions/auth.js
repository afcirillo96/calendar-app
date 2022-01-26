import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { eventLogout } from './events';
import { types } from "../types/types";
import Swal from "sweetalert2";

//Hacen el trabajo de Postman y el dispatch
//LOGIN
export const startLogin = ( email, password ) => {
    return async( dispatch) => {

        const resp = await fetchSinToken( 'auth', { email, password}, 'POST' );
        const body = await resp.json();
        
        if (body.ok) {
            localStorage.setItem('token', body.token);//guardo el token en el localStorage
            localStorage.setItem('token-init-date', new Date().getTime());//guardo su fecha de creacion
        
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}



//REGISTER
export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { name, email, password}, 'POST' );
        const body = await resp.json();
        
        if (body.ok) {
            localStorage.setItem('token', body.token);//guardo el token en el localStorage
            localStorage.setItem('token-init-date', new Date().getTime());//guardo su fecha de creacion
        
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
//Login sincronico. Necesario para Login como Register
const login = (user) => ({
    type: types.authLogin,
    payload:  user,
});


//Mantener Autenticado
export const startChecking = () => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();
        
        if (body.ok) {
            localStorage.setItem('token', body.token);//guardo el token en el localStorage
            localStorage.setItem('token-init-date', new Date().getTime());//guardo su fecha de creacion
        
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }))

        } else {
            dispatch( checkingFinish() );
        }
    }
}
//Check sincronico
const checkingFinish = () => ({ type: types.authCheckingFinish });



//LOGOUT
export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
};
//Logout sincronico
const logout = () => ({ type: types.authLogout });