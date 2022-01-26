import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';//para español
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');//para español

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    //para quedarnos en la ultima ventana
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const dispatch = useDispatch();//dispatch de acciones
    //Selectors
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    //este useEffect es para q carge los eventos
    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [dispatch])


    const onDoubleClick = (e) => {//evento para editar (pronto..)
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {//evento para sleccionar (pronto...)
        dispatch( eventSetActive(e) )
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    

    const eventStyleGetter = ( event, start, end, isSelected ) => {//probamos un evento
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    const onSelectedSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    return (
        <div className="calendar-container">
            <div className="calendar-screen">
                <Navbar/>
                
                <Calendar
                    localizer={localizer}
                    events={ events }//AQUI ENVIO MIS EVENTOS--------------
                    startAccessor="start"
                    endAccessor="end"
                    messages={ messages }
                    eventPropGetter={ eventStyleGetter }
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onView={onViewChange}
                    onSelectSlot={ onSelectedSlot }
                    selectable={ true }
                    view={lastView}
                    components={{//sirve para mostrar eventos
                        event: CalendarEvent
                    }}
                />
            </div>

            <AddNewFab />

            {
                ( activeEvent) &&
                <DeleteEventFab />
            }
            
            <CalendarModal />
        </div>
    )
}