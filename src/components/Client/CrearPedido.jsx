import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup'


export default function CrearPedido() {

    const token1 = localStorage.getItem("token");
    const token = "Bearer " + token1;

    // Obtén el parámetro de la URL (en este caso, el id)
    const { idProducto, prPrecio } = useParams();

    const obtenerFechaFormateada = () => {
        const opcionesDeFormato = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString('en-US', opcionesDeFormato);

        return fechaFormateada;
    };

    const fechaFormateada = obtenerFechaFormateada();
    console.log(fechaFormateada);

    console.log(idProducto, prPrecio)

    const [cliente, setClientes] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/Cliente/ConsultarCliente`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data2 = await response.json();
            console.log("Data del menu " + data2);
            console.log("El token es: " + token);

            // Verificar si data2 es un array antes de asignarlo a setMenus
            setClientes(Array.isArray(data2) ? data2 : []);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
            console.log("El token es: " + token);
        }
    };

    const formik = useFormik({
        initialValues: {
            peDireccion: '',
            pePrecio: prPrecio,
            peFecha: fechaFormateada,
            peActivo: true,
            peCancelado: false,
            idCliente: cliente.idCliente,
            idProducto: idProducto,
        },
        onSubmit: async (values, { setSubmitting }) => {
            // Aquí puedes realizar la lógica para enviar los datos al servidor
            try {
                const response = await fetch("http://localhost:8080/api/v1/Pedido/Iniciar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {

                    // Utiliza await para esperar a que se resuelva la promesa
                    const data = await response.json();

                    window.location.href = "http://localhost:5173/BuscarNegocios";
                } else {
                    // Manejar errores en la respuesta
                    console.error("Error en la solicitud:", response.statusText);
                }
            } catch (error) {
                // Manejar errores de red u otros errores
                console.error("Error en la solicitud:", error.message);
            }

            setSubmitting(false);
        },
    });

    return (
        <>
            <main className="card-container slideUp-animation">
                <div className="image-container">
                    <h1 className="company">Therion</h1>
                    <img src="./assets/images/signUp.svg" className="illustration" alt="" />
                    <p className="quote">Registra Negocio </p>
                    <a href="#btm" className="mobile-btm-nav">
                        <img src="./assets/images/dbl-arrow.png" alt="" />
                    </a>
                </div>
                <form action="" method="" onSubmit={formik.handleSubmit}>
                    <div className="form-container slideRight-animation">

                        <h1 className="form-header">
                            Confirmar Pedido
                        </h1>

                        <div className="input-container">
                            <label htmlFor="peDireccion"></label>
                            <input type="text" name="peDireccion" id="peDireccion" placeholder="Dirección Del Pedido" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.peDireccion} />
                            <span>
                                Dirección Del Pedido
                            </span>
                            {formik.touched.meNombre && formik.errors.meNombre ? (
                                <div className="error">{formik.errors.meNombre}</div>
                            ) : null}
                        </div>

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}
