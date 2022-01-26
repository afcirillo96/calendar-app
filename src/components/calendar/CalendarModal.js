import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');//Creamos la fecha actual con moment
const nowPlus1 = now.clone().add(1,'hours');//creamos la fehca actual + 1 hora

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    //usamos useState para modificar las fechas
    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState( initEvent )

    const { notes, title, start, end } = formValues;

    const { activeEvent } = useSelector(state => state.calendar)
    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues])


    const handleInputChange= ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //cierra el Modal
    const closeModal = () => {
        dispatch( uiCloseModal() )
        dispatch( eventClearActiveEvent() )
        setFormValues( initEvent )
    }

    //cambia fecha inicio
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    //cambia fecha fin
    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd) ) {//si momentStart esta igual o despues de momentEnd
            return Swal.fire({
                title: 'Error! La fecha fin debe ser mayor a la fecha de inicio!',
                imageUrl: 'https://i.redd.it/z1sc27pcbh461.png',
                imageWidth: 175,
                imageHeight: 175,
                imageAlt: 'Custom image',
            });
        }

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {                            //si activeUser: editando evento
            dispatch( eventStartUpdate(formValues) );
        } else {                                        //si null: creando un evento
            dispatch( eventStartAddNew(formValues) );   //Conectado a Backend
        }
       
        setTitleValid(true);
        closeModal();
    }


    return (
        <Modal
            isOpen={ modalOpen }
            //onAfterOpen={ afterOpenModal }
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> { (activeEvent)? 'Editar Evento': 'Nuevo Evento' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y Hora Inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y Hora Fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y Notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' } `}
                        placeholder="Título del Evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange } 
                    />
                    <small id="emailHelp" className="form-text text-muted">Una Descripción Corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange } 
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información Adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
