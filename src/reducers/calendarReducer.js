import { types } from "../types/types";

// {//ASI ES UN EVENTO-------------
//     id: 'ageagegrhrh'
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     notes: 'Comprar Transformers',
//     user: {
//         _id: '123',
//         name: 'Agustin'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            }
            
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            }

        case types.eventUpdated:
            return {
                ...state,//quiero actualizar un evento, y como ese evento esta dentro 
                events: state.events.map(//de un arreglo de events, etngo q usar un map para buscar ese evento q quiero actualizar
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(//filtramos los eventos
                    e => ( e.id !== state.activeEvent.id )//si el id del event es distinto
                ),
                activeEvent: null//ponemos el evento activo en null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]//todos los eventos
            }    

        case types.eventLogout:
            return {
                ...initialState//que seria algo asi...
                // events: [],
                // activeEvent: null,
            }

        default:
            return state;
    }
}