import moment from "moment";

//Para convertir String de un evento a ibjetos tipo Date

export const prepareEvents = ( events = [] ) => {

    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate(),
        })
    )
}