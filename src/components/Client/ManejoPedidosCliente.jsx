import { useState } from "react";

export default function ManejoPedidosCliente() {

    const token1 = localStorage.getItem("token");

    const token = "Bearer " + token1;

    //Negocios
    const [pedidos, setPedidos] = useState([]);

    const fetch = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/Pedido/ConsultarXClienteID", {
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
    }

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712403/WhatsApp_Image_2023-12-03_at_9.41.26_AM_lfsvv9.jpg" alt="Logo de la marca" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/BuscarNegocios">Buscar Negocios</a></li>
                        <li><a href="/ManejoPedidosCliente">Pedidos</a></li>
                    </ul>
                </nav>
                <a className="btn" href="/Perfil"><button>Perfil</button></a>
            </header>
            <section className="Centrado">
                {pedidos.map((pedido) => (
                    <div className="card" key={pedido.idPedido}>
                        <div className="img_container">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701730866/bjbzfalfovnobaw1sr1m.jpg" alt="" />
                        </div>
                        <div className="details_container">
                            <p className="montserrat">Pedido</p>
                            <h1 className="name">{pedido.pePrecio}</h1>
                            <h2>{pedido.peFecha}</h2>
                            <h2>Activo: {pedido.peActivo}</h2>
                            <h2>Dirección: {pedido.peDireccion}</h2>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
