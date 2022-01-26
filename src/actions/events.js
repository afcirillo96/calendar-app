import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

//CREAR EVENTO
export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST')//Endpoint de Postman
            const body = await resp.json();

            if(body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name,
                }

                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            console.log(error)
        }
    }
}
const eventAddNew = ( event ) => ({//sincrono, regresa un objeto
    type: types.eventAddNew,
    payload: event
});


//UPDATE EVENTO
export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' )
            const body = await resp.json();

            if(body.ok) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)

        }
    }
}
const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


//DELETE EVENTO
export const eventStartDelete = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' )
            const body = await resp.json();

            if(body.ok) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)

        }
    }
};
const eventDeleted = () => ({ type: types.eventDeleted });


//CARGAR EVENTOS EN PANTALLA
export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');//como es una peticion GET no hay q mandar nada mas
            const body = await resp.json();
            
            const events = prepareEvents( body.eventos );
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
        }
    }
};
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});


//SELLECCIONAR EVENTO Y MOSTRAR DATOS EN REDUX (READ)
export const eventSetActive = ( event ) => ({//sincrono, regresa un objeto
    type: types.eventSetActive,
    payload: event
});


//DES-SELECCIONAR EVENTO Y QUITAR DATOS DE REDUX
export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });


//LIMPIAR EVENTOS DEL STATE DE REDUX AL SALIR
export const eventLogout = () => ({ type: types.eventLogout });