import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Menu() {

    // Obtén el parámetro de la URL (en este caso, el id)
    const {idNegocio} = useParams();
    const { idMenu } = useParams();

    console.log(idMenu)

    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //pedidos
    const [productos, setProductos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/Negocios/Menu/ConsultarProductosxMenu/${idMenu}`, {
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
            setProductos(Array.isArray(data2) ? data2 : []);
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
                <h1>Tus Productos De Menú</h1>
                <a href={`/CrearProducto/${idMenu}`}> Nuevo Producto</a>
            </header>
            <section className='Centrado'>
                {productos.map((producto) => (
                    <div className="card" key={producto.idProducto}>
                        <div className="img_container">
                            <img src={producto.prImagen} alt="" />
                        </div>
                        <div className="details_container">
                            <p className="montserrat">Producto</p>
                            <h1 className="name">{producto.prNombre}</h1>
                            <h1></h1>
                            <Link to={`/CrearProducto/${producto.idProducto}`}>
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
