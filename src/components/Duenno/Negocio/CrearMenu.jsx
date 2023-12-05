import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup'


export default function CrearMenu() {

    const token1 = localStorage.getItem("token");
    const token = "Bearer " + token1;

    // Obtén el parámetro de la URL (en este caso, el id)
    const { idNegocio } = useParams();

    console.log(idNegocio)

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data',
        },
    };

    const formik = useFormik({
        initialValues: {
            meNombre: '',
            meDisponible: true,
            meActivo: true,
            idNegocio: idNegocio,
            archivo: null
        },

        onSubmit: async (values, { setSubmitting }) => {

            // Aquí puedes realizar la lógica para enviar los datos al servidor

            //Configurar Formulario Multipar
            const formData = new FormData();

            const negocioRequestWithoutArchivo = { ...values };
            delete negocioRequestWithoutArchivo.archivo;

            const menuRequest = JSON.stringify(negocioRequestWithoutArchivo);

            // Agregar 'negocioRequest' al formulario sin el campo 'archivo'
            formData.append('menuRequest', JSON.stringify(negocioRequestWithoutArchivo));

            formData.append('archivo', values.archivo, {
                type: 'multipart/form-data',
            });

            console.log(JSON.stringify(negocioRequestWithoutArchivo));

            console.log("El request que se manda es: " + menuRequest)

            console.log("El formData del negocio " + formData.get('menuRequest'))
            console.log("El formData del archivo " + formData.get('archivo'))

            try {
                const response = await axios.post("http://localhost:8080/api/v1/Negocio/Menu/Registro", formData, config);

                if (response.ok) {

                    // Utiliza await para esperar a que se resuelva la promesa
                    const data = await response.json();
                    window.location.href = `http://localhost:5173/EditarNegocio/${idNegocio}`
                } else {
                    // Manejar errores en la respuesta
                    console.error("Error en la solicitud:", response.statusText);
                }
            } catch (error) {
                // Manejar errores de red u otros errores
                console.log(formData)
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
                            Registra Menu
                        </h1>

                        <div className="input-container">
                            <label htmlFor="meNombre"></label>
                            <input type="text" name="meNombre" id="meNombre" placeholder="meNombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.meNombre} />
                            <span>
                                Nombre
                            </span>
                            {formik.touched.meNombre && formik.errors.meNombre ? (
                                <div className="error">{formik.errors.meNombre}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="archivo">
                                Imagen Del Negocio
                            </label>
                            <input
                                type="file"
                                name="archivo"
                                id="archivo"
                                required
                                placeholder="Imagen Del Negocio"
                                onChange={(event) => {
                                    formik.setFieldValue('archivo', event.currentTarget.files[0]);
                                }}
                            />
                            {formik.touched.archivo && formik.errors.archivo ? (
                                <div className="error">{formik.errors.archivo}</div>
                            ) : null}
                        </div>

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}
