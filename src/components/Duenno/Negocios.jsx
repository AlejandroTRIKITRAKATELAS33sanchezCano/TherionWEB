import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Negocios() {



    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //Negocios
    const [negocios, setNegocios] = useState([]);

    const handleEditarClick = (idNegocio) => {
        // Aquí puedes construir la URL con el idNegocio y navegar a la página de edición
        const url = `http://localhost:5173/EditarNegocio/${idNegocio}`;
        window.location.href = url
    };

    // Haciendo la solicitud al servidor
    // Definir una función asincrónica para poder usar await
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/Negocio/ConsultarxDuenno", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            console.log("El token es: " + token);

            setNegocios(data);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
            console.log("El token es: " + token);
        }
    };

    // Utilizar useEffect para realizar la solicitud después de que el componente se monte
    useEffect(() => {
        fetchData();
    }, []); // El segundo argumento es un array de dependencias, vacío en este caso para que solo se ejecute una vez

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712403/WhatsApp_Image_2023-12-03_at_9.41.26_AM_lfsvv9.jpg" alt="Logo de la marca" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#">Negocios</a></li>
                        <li><a href="/ManejoPedidos">Pedidos</a></li>
                    </ul>
                </nav>
            </header>
            <header className="header2">
                <h1>Tus Negocios</h1>
                <a href="/RegistroNegocio">Nuevo Negocio</a>
            </header>
            <section className="Centrado">
                {negocios.map((negocio) => (
                    <div className="card" key={negocio.idNegocio}>
                        <div className="img_container">
                            <img src={negocio.neImagen} alt="" />
                        </div>
                        <div className="details_container">
                            <p className="montserrat">Negocio</p>
                            <h1 className="name">{negocio.neNombre}</h1>

                            <button className="btn">
                                <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590561/food-delivery-symbol-logo-37F3E64A34-seeklogo.com_lwzzn6.png" alt="" />
                                Pedidos
                            </button>

                            <Link to={`/EditarNegocio/${negocio.idNegocio}`}>
                                <button className="btn">
                                    <img
                                        src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590492/4436557-200_rh1pw5.png"
                                        alt=""
                                    />
                                    Editar
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

        </>

    )
}
