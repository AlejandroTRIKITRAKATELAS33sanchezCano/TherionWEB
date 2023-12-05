import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup'


export default function CrearProducto() {

    const token1 = localStorage.getItem("token");
    const token = "Bearer " + token1;

    // Obtén el parámetro de la URL (en este caso, el id)
    const { idMenu } = useParams();

    console.log(idMenu)

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data',
        },
    };

    const formik = useFormik({
        initialValues: {
            prNombre: '',
            prPrecio: 0,
            prDescripcion: '',
            idMenu: idMenu,
            archivo: null
        },

        onSubmit: async (values, { setSubmitting }) => {

            // Aquí puedes realizar la lógica para enviar los datos al servidor

            //Configurar Formulario Multipar
            const formData = new FormData();

            const negocioRequestWithoutArchivo = { ...values };
            delete negocioRequestWithoutArchivo.archivo;

            const productoRequestJson = JSON.stringify(negocioRequestWithoutArchivo);

            // Agregar 'negocioRequest' al formulario sin el campo 'archivo'
            formData.append('productoRequestJson', JSON.stringify(negocioRequestWithoutArchivo));

            formData.append('archivo', values.archivo, {
                type: 'multipart/form-data',
            });

            console.log(JSON.stringify(negocioRequestWithoutArchivo));

            console.log("El request que se manda es: " + productoRequestJson)

            console.log("El formData del negocio " + formData.get('productoRequestJson'))
            console.log("El formData del archivo " + formData.get('archivo'))

            try {
                const response = await axios.post("http://localhost:8080/api/v1/Negocio/Menu/Producto/Registro", formData, config);

                if (response.ok) {

                    // Utiliza await para esperar a que se resuelva la promesa
                    const data = await response.json();
                    window.location.href = `http://localhost:5173/Menu/${idMenu}`
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
                    <p className="quote">Registra Producto </p>
                    <a href="#btm" className="mobile-btm-nav">
                        <img src="./assets/images/dbl-arrow.png" alt="" />
                    </a>
                </div>
                <form action="" method="" onSubmit={formik.handleSubmit}>
                    <div className="form-container slideRight-animation">

                        <h1 className="form-header">
                            Registra Producto
                        </h1>

                        <div className="input-container">
                            <label htmlFor="prNombre"></label>
                            <input type="text" name="prNombre" id="prNombre" placeholder="prNombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.prNombre} />
                            <span>
                                Nombre
                            </span>
                            {formik.touched.prNombre && formik.errors.prNombre ? (
                                <div className="error">{formik.errors.prNombre}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="prPrecio"></label>
                            <input type="number" name="prPrecio" id="prPrecio" placeholder="prPrecio" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.prPrecio} />
                            <span>
                                Precio
                            </span>
                            {formik.touched.prPrecio && formik.errors.prPrecio ? (
                                <div className="error">{formik.errors.prPrecio}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="prDescripcion"></label>
                            <input type="text" name="prDescripcion" id="prDescripcion" placeholder="prDescripcion" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.prDescripcion} />
                            <span>
                                Descripcion
                            </span>
                            {formik.touched.prDescripcion && formik.errors.prDescripcion ? (
                                <div className="error">{formik.errors.prDescripcion}</div>
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
                                placeholder="Imagen Del Producto"
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
