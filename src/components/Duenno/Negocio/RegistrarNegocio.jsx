import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup'

export default function RegistrarNegocio() {

    const [tiposNegocios, setTiposNegocios] = useState([]);
    const [loading, setLoading] = useState(true);

    const token1 = localStorage.getItem("token");
    const token = "Bearer " + token1;

    useEffect(() => {
        const fetchTiposNegocios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/Negocio/TipoNegocio', {
                    headers: {
                        Authorization: token, // Aquí debes incluir tu token
                    },
                });
                setTiposNegocios(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchTiposNegocios();
    }, []);

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data',
        },
    };

    const formik = useFormik({
        initialValues: {
            neNombre: '',
            neAbierto: true,
            neActivo: true,
            neBorrado: false,
            token: token1,
            neTarjeta: false,
            neDomicilio: false,
            esNombre: '',
            alcaldia: '',
            colonia: '',
            codigopostal: '',
            coNombre: '',
            coTelefono: '',
            idTipoNegocio: '',
            archivo: null
        },

        onSubmit: async (values, { setSubmitting }) => {

            // Aquí puedes realizar la lógica para enviar los datos al servidor

            //Configurar Formulario Multipar
            const formData = new FormData();

            const negocioRequestWithoutArchivo = { ...values };
            delete negocioRequestWithoutArchivo.archivo;

            const negocioRequestJson = JSON.stringify(negocioRequestWithoutArchivo);

            // Agregar 'negocioRequest' al formulario sin el campo 'archivo'
            formData.append('negocioRequestJson', JSON.stringify(negocioRequestWithoutArchivo));

            formData.append('archivo', values.archivo,{
                type: 'multipart/form-data',
            });

            console.log(JSON.stringify(negocioRequestWithoutArchivo));

            console.log("El request que se manda es: " + negocioRequestJson)

            console.log("El formData del negocio " + formData.get('negocioRequestJson'))
            console.log("El formData del archivo " + formData.get('archivo'))

            try {
                const response = await axios.post("http://localhost:8080/api/v1/Negocio/Registro", formData, config);

                if (response.ok) {

                    // Utiliza await para esperar a que se resuelva la promesa
                    const data = await response.json();

                    // Guarda el token en el estado local
                    setAuthToken(data.token);

                    // Ahora puedes acceder a la propiedad que necesitas (por ejemplo, token)
                    console.log("Exitoso, Tu token es: ", data.token);
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
                            Registra Negocio
                        </h1>

                        <div className="input-container">
                            <label htmlFor="neNombre"></label>
                            <input type="text" name="neNombre" id="neNombre" placeholder="Nombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.neNombre} />
                            <span>
                                Nombre
                            </span>
                            {formik.touched.neNombre && formik.errors.neNombre ? (
                                <div className="error">{formik.errors.neNombre}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="coNombre"></label>
                            <input type="text" name="coNombre" id="coNombre" placeholder="Nombre Del Contacto" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.coNombre} />
                            <span>
                                Nombre De Contacto
                            </span>
                            {formik.touched.coNombre && formik.errors.coNombre ? (
                                <div className="error">{formik.errors.coNombre}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label for="coTelefono">
                            </label>
                            <input type="tel" placeholder="Telefono De Contacto" name="coTelefono" id="coTelefono" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.coTelefono} />
                            <span>Telefono</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="esNombre"></label>
                            <input type="text" placeholder="Estado Donde Vives" name="esNombre" id="esNombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.esNombre} />
                            <span>
                                Nombre Del Estado
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="alcaldia"></label>
                            <input type="text" placeholder="Alcaldia Donde Vives" name="alcaldia" id="alcaldia" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.alcaldia} />
                            <span>
                                Alcaldía
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="colonia"></label>
                            <input type="text" placeholder="Colonia Donde Vives" name="colonia" id="colonia" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.colonia} />
                            <span>
                                Colonia
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="codigopostal"></label>
                            <input type="text" placeholder="Codigo Postal" name="codigopostal" id="codigopostal" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.codigopostal} />
                            <span>
                                Codigo Postal
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-neTarjeta">
                            <label htmlFor="neTarjeta">
                                Pago Con Tarjeta
                            </label>
                            <input type="checkbox" name="neTarjeta" id="neTarjeta" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.neTarjeta} />
                            {formik.touched.neTarjeta && formik.errors.neTarjeta ? (
                                <div className="error">{formik.errors.neTarjeta}</div>
                            ) : null}
                        </div>

                        <div className="input-neTarjeta">
                            <label htmlFor="neDomicilio">
                                Envios A Domicilio
                            </label>
                            <input type="checkbox" name="neDomicilio" id="neDomicilio" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.neDomicilio} />
                            {formik.touched.neDomicilio && formik.errors.neDomicilio ? (
                                <div className="error">{formik.errors.neDomicilio}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="idTipoNegocio">Tipo De Negocio</label>
                            <select
                                type="select"
                                name="idTipoNegocio"
                                id="idTipoNegocio"
                                className="user-password"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.idTipoNegocio}
                            >
                                <option value="" disabled>
                                    Seleccione un tipo de negocio
                                </option>
                                {loading ? (
                                    <option value="" disabled>
                                        Cargando...
                                    </option>
                                ) : (
                                    tiposNegocios.map((tipoNegocio) => (
                                        <option key={tipoNegocio.idTipoNegocio} value={tipoNegocio.idTipoNegocio}>
                                            {tipoNegocio.tiNombre}
                                        </option>
                                    ))
                                )}
                            </select>
                            {formik.touched.idTipoNegocio && formik.errors.idTipoNegocio ? (
                                <div className="error">{formik.errors.idTipoNegocio}</div>
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
