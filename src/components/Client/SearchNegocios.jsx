import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchNegocios() {


    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //Negocios
    const [negocios, setNegocios] = useState([]);

    // Haciendo la solicitud al servidor
    // Definir una función asincrónica para poder usar await
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/Negocios/ConsultarALL", {
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
                        <li><a href="#">Buscar Negocios</a></li>
                        <li><a href="/ManejoPedidosCliente">Pedidos</a></li>
                    </ul>
                </nav>
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

                            <Link to={`/VerMenus/${negocio.idNegocio}`}>
                                <button className="btn">
                                    <img
                                        src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590492/4436557-200_rh1pw5.png"
                                        alt=""
                                    />
                                    Ver Menus
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
