import { useAuth } from "../AuthContext";

export default function Negocios() {

    const { authToken } = useAuth();
    // Haciendo la solicitud al servidor
    fetch("http://localhost:8080/api/v1/Negocio/ConsultarxDuenno", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //console.log("El token es: " + authToken)
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            console.log("El token es: " + authToken)
        })
        .catch(error => {
            // Manejar errores
            console.error("Error en la solicitud:", error.message);
            console.log("El token es: " + authToken)
        });

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="../img/Mountain.png" alt="Logo de la marca" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Negocios</a></li>
                        <li><a href="/LoginDuenno">Pedidos</a></li>
                    </ul>
                </nav>
                <a className="btn" href="/Perfil"><button>Perfil</button></a>
            </header>
            <header className="header2">
                <h1>Tus Negocios</h1>
                <a href="/RegistroNegocio">Nuevo Negocio</a>
            </header>
            <section className="Centrado">
                <div className="card">
                    <div className="img_container">
                        <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701278441/g7ddyt0kr5cgsiwdhnmc.jpg" alt="" />
                    </div>
                    <div className="details_container">
                        <p className="montserrat">Negocio</p>
                        <h1 className="name">Nombre Del Negocio</h1>

                        <button className="btn">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590561/food-delivery-symbol-logo-37F3E64A34-seeklogo.com_lwzzn6.png" alt="" />
                            Pedidos
                        </button>

                        <button className="btn">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590492/4436557-200_rh1pw5.png" alt="" />
                            Editar
                        </button>

                    </div>
                </div>
            </section>

        </>

    )
}
