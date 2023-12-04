import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'

export default function RegistroDuenno() {

    //Token
    const [authToken, setAuthToken] = useState(null);

    //Formik

    const formik = useFormik({
        initialValues: {
            dunNombre: '',
            duAppat: '',
            duApmat: '',
            duCorreo: '',
            duContrasenna: '',
        },
        validationSchema: Yup.object({
            dunNombre: Yup.string().required('Nombre(s) es obligatorio'),
            duAppat: Yup.string().required('Apellido Paterno es obligatorio'),
            duApmat: Yup.string().required('Apellido Materno es obligatorio'),
            duCorreo: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
            duContrasenna: Yup.string().min(8, 'Contraseña debe tener al menos 8 caracteres').required('Contraseña es obligatoria'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            // Aquí puedes realizar la lógica para enviar los datos al servidor
            try {
                const response = await fetch("http://localhost:8080/auth/duenno/registrar", {
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
                    console.log("Exitoso, Tu token es: ", localStorage.getItem("token"));
                    
                    window.location.href = "http://localhost:5173/Negocios";
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
                            Registrate Como Dueño
                        </h1>

                        <div className="input-container">
                            <label htmlFor="dunNombre"></label>
                            <input type="text" name="dunNombre" id="dunNombre" placeholder="Nombre(s)" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.dunNombre} />
                            <span>
                                Nombre(s)
                            </span>
                            {formik.touched.dunNombre && formik.errors.dunNombre ? (
                                <div className="error">{formik.errors.dunNombre}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="duAppat"></label>
                            <input type="text" name="duAppat" id="duAppat" placeholder="Apellido Paterno" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.duAppat} />
                            <span>
                                Apellido Paterno
                            </span>
                            {formik.touched.duAppat && formik.errors.duAppat ? (
                                <div className="error">{formik.errors.duAppat}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="duApmat"></label>
                            <input type="text" name="duApmat" id="duApmat" placeholder="Apellido Materno" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.duApmat} />
                            <span>
                                Apellido Materno
                            </span>
                            {formik.touched.duApmat && formik.errors.duApmat ? (
                                <div className="error">{formik.errors.duApmat}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="duCorreo">
                            </label>
                            <input type="email" name="duCorreo" id="duCorreo" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.duCorreo} />
                            <span>
                                E-mail
                            </span>
                            {formik.touched.duCorreo && formik.errors.duCorreo ? (
                                <div className="error">{formik.errors.duCorreo}</div>
                            ) : null}
                        </div>

                        <div className="input-container">
                            <label htmlFor="duContrasenna"></label>
                            <input type="password" name="duContrasenna" id="duContrasenna" className="user-password" required onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.duContrasenna} />
                            <span>Contraseña</span>
                            {formik.touched.duContrasenna && formik.errors.duContrasenna ? (
                                <div className="error">{formik.errors.duContrasenna}</div>
                            ) : null}
                        </div>

                        <div id="btm">
                            <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                                Registrarse
                            </button>
                            <p className="btm-text">
                                ¿Ya tienes cuenta? <a href="/LoginDuenno" className="btm-text-highlighted">  Inicia Sesión</a>
                            </p>
                            <p className="btm-text">
                                ¿Eres Cliente? <a href="/RegistroCliente" className="btm-text-highlighted">  Registrate Cliente</a>
                            </p>
                        </div>
                    </div>
                </form>
            </main>
            <section className="outro-overlay disabled slideUp-animation">
                <h1 className="company">Therion <sup>&trade;</sup></h1>
                <h1 className="outro-greeting">Gracias Por Registrarte</h1>
                <img src="./assets/images/shape.svg" alt="" className="shape" />
                <img src="./assets/images/signedUp.svg" alt="" id="signedUp-illustration" className="slideRight-animation" />
            </section>
        </div>
    )
}
