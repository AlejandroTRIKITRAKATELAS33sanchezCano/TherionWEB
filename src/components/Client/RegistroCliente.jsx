import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup'


export default function RegistroCliente() {

    const [loading, setLoading] = useState(true);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/Negocio/ObtenerEstados', {
                });
                setEstados(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEstados();
    }, []);

    //Formik

    const formik = useFormik({
        initialValues: {
            clNombre: '',
            clAppat: '',
            clApmat: '',
            clCorreo: '',
            clContrasenna: '',
            clNumero1: '',
            clNumero2: '',
            esNombre: '',
            alcaldia: '',
            colonia: '',
            codigopostal: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            // Aquí puedes realizar la lógica para enviar los datos al servidor
            try {
                const response = await fetch("http://localhost:8080/auth/cliente/registrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    // Utiliza await para esperar a que se resuelva la promesa
                    const data = await response.json();

                    localStorage.setItem('token', data.token);

                    console.log("Tu token guardado fué: " + localStorage.getItem("token"))

                    // Ahora puedes acceder a la propiedad que necesitas (por ejemplo, token)
                    console.log("Exitoso, Tu token es: ", data.token);
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
        <div>
            <header className="header">
                <div className="logo">
                    <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712403/WhatsApp_Image_2023-12-03_at_9.41.26_AM_lfsvv9.jpg" alt="Logo de la marca" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Sobre nosotros</a></li>
                        <li><a href="/LoginDuenno">Dueño</a></li>
                        <li><a href="/LoginCliente">Cliente</a></li>
                    </ul>
                </nav>
                <a className="btn" href="/RegistroCliente"><button>Registrate</button></a>
            </header>
            <main className="card-container slideUp-animation">
                <div className="image-container">
                    <h1 className="company">Therion</h1>
                    <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712403/WhatsApp_Image_2023-12-03_at_9.41.26_AM_lfsvv9.jpg" className="illustration" alt="" />
                    <p className="quote">Registrate Y Empieza A Realizar Pedidos A Domicilio</p>
                    <a href="#btm" className="mobile-btm-nav">
                        <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712627/up-arrow-5_urxa0z.png" alt="" />
                    </a>
                </div>
                <form action="" method="" onSubmit={formik.handleSubmit}>
                    <div className="form-container slideRight-animation">

                        <h1 className="form-header">
                            Registrate Como Cliente
                        </h1>

                        <div className="input-container">
                            <label htmlFor="clNombre"></label>
                            <input type="text" placeholder="Nombre(s)" name="clNombre" id="clNombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clNombre} />
                            <span>
                                Nombre(s)
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="clAppat"></label>
                            <input type="text" placeholder="Apellido Paterno" name="clAppat" id="clAppat" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clAppat} />
                            <span>
                                Apellido Paterno
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="clApmat"></label>
                            <input type="text" placeholder="Apellido Materno" name="clApmat" id="clApmat" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clApmat} />
                            <span>
                                Apellido Materno
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="mail">
                            </label>
                            <input type="email" placeholder="Correo" name="clCorreo" id="clCorreo" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clCorreo} />
                            <span>
                                E-mail
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="clContrasenna"></label>
                            <input type="password" placeholder="Contraseña" name="clContrasenna" id="clContrasenna" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clContrasenna} />
                            <span>Contraseña</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label for="clNumero1">
                            </label>
                            <input type="tel" placeholder="Telefono Celular" name="clNumero1" id="clNumero1" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clNumero1} />
                            <span>Telefono</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label for="clNumero2">
                            </label>
                            <input type="tel" placeholder="Telefono Celular 2" name="clNumero2" id="clNumero2" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clNumero2} />
                            <span>Telefono 2</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="esNombre">Estado</label>
                            <select
                                type="select"
                                name="esNombre"
                                id="esNombre"
                                className="user-password"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.esNombre}
                            >
                                <option value="" disabled>
                                    Selecciona Un Estado
                                </option>
                                {loading ? (
                                    <option value="" disabled>
                                        Cargando...
                                    </option>
                                ) : (
                                    estados.map((estado) => (
                                        <option key={estado.idEstado} value={estado.esNombre}>
                                            {estado.esNombre}
                                        </option>
                                    ))
                                )}
                            </select>
                            {formik.touched.esNombre && formik.errors.esNombre ? (
                                <div className="error">{formik.errors.esNombre}</div>
                            ) : null}
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

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                                Registrarse
                            </button>
                            <p className="btm-text">
                                ¿Ya tienes cuenta? <a href="/LoginCliente" className="btm-text-highlighted">  Inicia Sesión</a>
                            </p>
                            <p className="btm-text">
                                ¿Eres Dueño? <a href="/LoginDuenno" className="btm-text-highlighted">  Inicia Sesión Dueño</a>
                            </p>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
