import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        síntomas: ''
    });
    const [ error, actualizarError ] = useState(false)

    //Función que se ejecuta cuando el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

//Extraer los valores
const { mascota, propietario, fecha, hora, síntomas } = cita;

//cuando el usuario presiona agregar cita
const submitCita = e=> {
    e.preventDefault();


    //validar
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || síntomas.trim() === '') {
        actualizarError(true);
        return;
    }
    //eliminar el mensaje previo de error
    actualizarError(false);

    //asignar un id
    cita.id = uuid();

    //crear la cita
    crearCita(cita);

    //reiniciar el form
    actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        síntomas: ''
    })
}

    return (
        <Fragment>
            <h2>Crear cita</h2>
                { error ?  <p className="alerta-error">Todos los campos son obligatorios</p>     : null }
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    hora={hora}
                />
                <label>Síntomas</label>
                <textarea className="u-full-width"
                name="síntomas"
                onChange={actualizarState}
                value={síntomas}
                >          
                </textarea>
                <button
                type="submit"
                className="u-full-width button-primary"
                >Agregar cita  
                </button>
                    
                    
            </form>
        </Fragment>
     );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;

