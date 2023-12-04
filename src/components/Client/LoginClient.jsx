import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'

export default function LoginClient() {

    //Token
    const [authToken, setAuthToken] = useState(null);

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
                const response = await fetch("http://localhost:8080/auth/cliente/login", {
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

                    localStorage.setItem('token', data.token);

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
                            Inicia Sesión Como Cliente
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
                                No tienes cuenta? <a href="/RegistroCliente" className="btm-text-highlighted">  Registrate</a>
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
