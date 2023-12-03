import { useState } from "react";
import { useRef } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'


export default function RegistroCliente() {

    //Token
    const [authToken, setAuthToken] = useState(null);

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
            codigopostal:''
        },
        validationSchema: Yup.object({
            clNombre: Yup.string().required('Nombre(s) es obligatorio'),
            clAppat: Yup.string().required('Apellido Paterno es obligatorio'),
            clApmat: Yup.string().required('Apellido Materno es obligatorio'),
            clCorreo: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
            clContrasenna: Yup.string().min(8, 'Contraseña debe tener al menos 8 caracteres').required('Contraseña es obligatoria'),
            clNumero1: Yup.string().min(10, 'Ingresa un numero Valido').required('Campo Obligatorio'),
            clNumero2: Yup.string().min(10, 'Ingresa un numero Valido').required('Campo Obligatorio'),
            esNombre: Yup.string().required('Campo Obligatorio'),
            alcaldia: Yup.string().required('Campo Obligatorio'),
            colonia: Yup.string().required('Campo Obligatorio'),
            codigopostal: Yup.string().required('Campo Obligatorio'),
        }),
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
                console.error("Error en la solicitud:", error.message);
            }

            setSubmitting(false);
        },
    });

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src="../img/Mountain.png" alt="Logo de la marca" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Sobre nosotros</a></li>
                        <li><a href="/RegistroDuenno">Dueño</a></li>
                        <li><a href="#">Cliente</a></li>
                    </ul>
                </nav>
                <a className="btn" href="#"><button>Registrate</button></a>
            </header>
            <main className="card-container slideUp-animation">
                <div className="image-container">
                    <h1 className="company">Therion</h1>
                    <img src="./assets/images/signUp.svg" className="illustration" alt="" />
                    <p className="quote">Registrate Y Empieza A Recibir Tus Pedidos</p>
                    <a href="#btm" className="mobile-btm-nav">
                        <img src="./assets/images/dbl-arrow.png" alt="" />
                    </a>
                </div>
                <form action="" method="" onSubmit={formik.handleSubmit}>
                    <div className="form-container slideRight-animation">

                        <h1 className="form-header">
                            Registrate Como Cliente
                        </h1>

                        <div className="input-container">
                            <label htmlFor="clNombre"></label>
                            <input type="text" placeholder="Nombre(s)" name="clNombre" id="clNombre" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.clNombre}/>
                            <span>
                                Nombre(s)
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="l-name"></label>
                            <input type="text" placeholder="Apellido Paterno" name="clAppat" id="clAppat" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clAppat}/>
                            <span>
                                Apellido Paterno
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="clApmat"></label>
                            <input type="text" placeholder="Apellido Materno" name="clApmat" id="clApmat" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clApmat}/>
                            <span>
                                Apellido Materno
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="mail">
                            </label>
                            <input type="email" placeholder="Correo" name="clCorreo" id="clCorreo" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clCorreo}/>
                            <span>
                                E-mail
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="clContrasenna"></label>
                            <input type="password" placeholder="Contraseña" name="clContrasenna" id="clContrasenna" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clContrasenna}/>
                            <span>Contraseña</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label for="clNumero1">
                            </label>
                            <input type="tel" placeholder="Telefono Celular" name="clNumero1" id="clNumero1" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clNumero1}/>
                            <span>Telefono</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label for="clNumero2">
                            </label>
                            <input type="tel" placeholder="Telefono Celular 2" name="clNumero2" id="clNumero2" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.clNumero2}/>
                            <span>Telefono 2</span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="esNombre"></label>
                            <input type="text" placeholder="Estado Donde Vives" name="esNombre" id="esNombre" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.esNombre}/>
                            <span>
                                Nombre Del Estado
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="alcaldia"></label>
                            <input type="text" placeholder="Alcaldia Donde Vives" name="alcaldia" id="alcaldia" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.alcaldia}/>
                            <span>
                                Alcaldía
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="colonia"></label>
                            <input type="text" placeholder="Colonia Donde Vives" name="colonia" id="colonia" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.colonia}/>
                            <span>
                                Colonia
                            </span>
                            <div className="error"></div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="codigopostal"></label>
                            <input type="text" placeholder="Codigo Postal" name="codigopostal" id="codigopostal" onChange={formik.handleChange} onBlur={Formik.handleChange} value={formik.values.codigopostal}/>
                            <span>
                                Codigo Postal
                            </span>
                            <div className="error"></div>
                        </div>

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>Registrarse</button>
                            <p className="btm-text">
                                ¿Ya tienes cuenta? <a href="/LoginDuenno" className="btm-text-highlighted">  Inicia Sesión</a>
                            </p>
                            <p className="btm-text">
                                ¿Eres Dueño? <a href="/RegistroDuenno" className="btm-text-highlighted">  Inicia Sesión Dueño</a>
                            </p>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
