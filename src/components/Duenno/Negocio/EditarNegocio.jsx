import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function EditarNegocio() {

    // Obtén el parámetro de la URL (en este caso, el id)
    const { idNegocio } = useParams();

    console.log(idNegocio)

    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //Negocios
    const [negocios, setNegocios] = useState([]);
    const [menus, setMenus] = useState([]);

    const fetchData2 = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/Negocios/Menu/ConsultarXNegocio/${idNegocio}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data2 = await response.json();
            console.log("Data del menu " + data2);
            console.log("El token es: " + token);

            // Verificar si data2 es un array antes de asignarlo a setMenus
            setMenus(Array.isArray(data2) ? data2 : []);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
            console.log("El token es: " + token);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/Negocio/Consultar/otro/${idNegocio}`, {
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
        fetchData2();
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
                <a className="btn" href="/Perfil"><button>Perfil</button></a>
            </header>
            <section className="Centrado">
                <div className="card" key={negocios.idNegocio}>
                    <div className="img_container">
                        <img src={negocios.neImagen} alt="" />
                    </div>
                    <div className="details_container">
                        <p className="montserrat">Negocio</p>
                        <h1 className="name">{negocios.neNombre}</h1>
                        <h2 className='name'>Abierto {negocios.neAbierto}</h2>
                        <h2 className='name'>Activo {negocios.neActivo}</h2>

                        <button className="btn">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590561/food-delivery-symbol-logo-37F3E64A34-seeklogo.com_lwzzn6.png" alt="" />
                            Pedidos
                        </button>

                        <Link to={`/EditarNegocio2/${negocios.idNegocio}`}>
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
            </section>
            <header className="header2">
                <h1>Tus Menus De "{negocios.neNombre}"</h1>
                <a href={`/CrearMenu/${negocios.idNegocio}`}> Nuevo Menu</a>
            </header>
            <section className='Centrado'>
                {menus.map((menu) => (
                    <div className="card" key={menu.idMenu}>
                        <div className="img_container">
                            <img src={menu.meImagen} alt="" />
                        </div>
                        <div className="details_container">
                            <p className="montserrat">Menu</p>
                            <h1 className="name">{menu.meNombre}</h1>

                            <Link to={`/Menu/${negocios.idNegocio}/${menu.idMenu}`}>
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
