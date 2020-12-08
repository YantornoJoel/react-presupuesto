import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Error } from './Error';

export const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {

    // Definir el state
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)

    // Funcion que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad(parseInt(e.target.value))
    }

    // Submit para definir el presupuesto 
    const agregarPresupuesto = e => {
        e.preventDefault();

        // Validar
        // isNan es cuando el usuario intenta enviar el campo vacio
        if (cantidad < 1 || isNaN(cantidad)) {
            guardarError(true)
            return;
        }

        // Si pasa la validación
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);

    }



    return (
        <>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="El presupuesto es incorrecto" /> : null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ingresa tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />
            </form>
        </>
    )
}



Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}