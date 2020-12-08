import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Error } from './Error'
import shortid from 'shortid'

export const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    // Definir el state
    const [nombre, guardarNombre] = useState('')
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)


    //  Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        // Validar
        // isNan es cuando el usuario intenta enviar el campo vacio
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false)

        // Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        // Pasar el gasto al componente principal 
        guardarGasto(gasto);
        guardarCrearGasto(true);

        // Resetear el formulario
        guardarNombre('');
        guardarCantidad(0)
    }


    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agregar tus gastos</h2>

            { error ? <Error mensaje="Todos los campos son obligatorios, o presupuesto incorrecto" /> : null}

            <div className="campo">
                <label>Nombre del gasto</label>

                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ejemplo Comida"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad del gasto</label>

                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ejemplo $300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />

        </form>
    )
}


Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}