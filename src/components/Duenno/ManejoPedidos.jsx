import { useEffect, useState } from 'react';


export default function ManejoPedidos() {


    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //Pedidos
    const [pedidos, setPedidos] = useState([]);

    // Haciendo la solicitud al servidor
    // Definir una función asincrónica para poder usar await
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/Pedido/ConsultarXNegocioID", {
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

            setPedidos(data);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
            console.log("El token es: " + token);
        }
    };

    // Utilizar useEffect para realizar la solicitud después de que el componente se monte
    useEffect(() => {
        fetchData();
    }, []); // El segundo argumento es un array de dependencias, vacío en este caso para que solo se ejecute una vez

    const actualizarPedido = async (idPedido, estado) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/actualizarPedido/${idPedido}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ peActivo: estado }),
            });

            if (response.ok) {
                console.log(`Pedido ${idPedido} actualizado correctamente.`);
                // Aquí puedes realizar alguna acción adicional si es necesario.
            } else {
                console.error(`Error al actualizar pedido ${idPedido}.`);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const entregarPedido = (idPedido) => {
        actualizarPedido(idPedido, false);
    };

    const cancelarPedido = (idPedido) => {
        actualizarPedido(idPedido, true);
    };

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
            <section className="Centrado">
                {pedidos.map((pedido) => (
                    <div className="card" key={pedido.idPedido}>
                        <div className="img_container">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701730866/bjbzfalfovnobaw1sr1m.jpg" alt="" />
                        </div>
                        <div className="details_container">
                            <p className="montserrat">Pedido</p>
                            <h1 className="name">{pedido.pePrecio}$</h1>
                            <p className="montserrat">{pedido.peFecha}</p>
                            <button className="btn" onClick={() => entregarPedido(pedido.idPedido)}>
                                <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590561/food-delivery-symbol-logo-37F3E64A34-seeklogo.com_lwzzn6.png" alt="" />
                                Aceptar
                            </button>

                            <button className="btn" onClick={() => cancelarPedido(pedido.idPedido)}>
                                <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590492/4436557-200_rh1pw5.png" alt="" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
