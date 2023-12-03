import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useAuth } from "../AuthContext";

export default function LoginDuenno() {

    //Token
    const { authToken, setToken } = useAuth();

    //Formik

    const formik = useFormik({
        initialValues: {
            email: '',
            contrasenna: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
            contrasenna: Yup.string().min(8, 'Contraseña debe tener al menos 8 caracteres').required('Contraseña es obligatoria'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            // Aquí puedes realizar la lógica para enviar los datos al servidor
            try {
                const response = await fetch("http://localhost:8080/auth/duenno/login", {
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
                    setToken(data.token);

                    console.log("El token guardado es: " + authToken)

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
                        <li><a href="/LoginDuenno">Dueño</a></li>
                        <li><a href="/LoginCliente">Cliente</a></li>
                    </ul>
                </nav>
                <a className="btn" href="/RegistroCliente"><button>Registrate</button></a>
            </header>
            <main className="card-container slideUp-animation">
                <div className="image-container">
                    <h1 className="company">Therion</h1>
                    <img src="./assets/images/signUp.svg" className="illustration" alt="" />
                    <p className="quote">Empieza A Realizar Pedidos A Domicilio</p>
                    <a href="#btm" className="mobile-btm-nav">
                        <img src="./assets/images/dbl-arrow.png" alt="" />
                    </a>
                </div>
                <form action="" method="" onSubmit={formik.handleSubmit}>
                    <div className="form-container slideRight-animation">

                        <h1 className="form-header">
                            Inicia Sesión Como Dueño
                        </h1>

                        <div className="input-container">
                            <label htmlFor="email">
                            </label>
                            <input type="email" name="email" id="email" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.email} />
                            <span>
                                E-mail
                            </span>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="contrasenna"></label>
                            <input type="password" name="contrasenna" id="contrasenna" className="user-password" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.contrasenna} />
                            <span>Contraseña</span>
                            {formik.touched.contrasenna && formik.errors.contrasenna ? (
                                <div className="error">{formik.errors.contrasenna}</div>
                            ) : null}
                        </div>

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                            Inicia Sesión
                            </button>
                            <p className="btm-text">
                                ¿Ya tienes cuenta? <a href="/LoginDuenno" className="btm-text-highlighted">  Inicia Sesión</a>
                            </p>
                            <p className="btm-text">
                                ¿Eres Cliente? <a href="/LoginCliente" className="btm-text-highlighted">  Inicia Sesión Cliente</a>
                            </p>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
