export default function Index() {
    return (
        <div>
            <header class="hero">
                <nav class="nav container">
                    <div class="nav__logo">
                        <h2 class="nav__title">Therion Delivery</h2>
                    </div>

                    <ul class="nav__link nav__link--menu">
                        <li class="nav__items">
                            <a href="#" class="nav__links">Inicio</a>
                        </li>
                        <li class="nav__items">
                            <a href="/RegistroDuenno" class="nav__links">Registrarse</a>
                        </li>
                        <li class="nav__items">
                            <a href="/LoginDuenno" class="nav__links">Inicia Sesión</a>
                        </li>
                        <li class="nav__items">
                            <a href="#" class="nav__links">Descargar App</a>
                        </li>

                        <img src="./images/close.svg" class="nav__close" />
                    </ul>

                    <div class="nav__menu">
                        <img src="./images/menu.svg" class="nav__img" />
                    </div>
                </nav>

                <section class="hero__container container">
                    <h1 class="hero__title">Disfruta de la mejor entrega a domicilio con Therion Delivery</h1>
                    <p class="hero__paragraph">Explora una variedad de restaurantes y cocina internacional desde la comodidad de tu hogar. ¡Therion Delivery te lleva lo que quieras!</p>
                    <a href="#" class="cta">Ordena ahora</a>
                </section>
            </header>

            <main>
                <section class="container about">
                    <h2 class="subtitle">¿Por qué elegir Therion Delivery?</h2>
                    <p class="about__paragraph">Therion Delivery ofrece una experiencia única con entrega rápida, variedad de opciones gastronómicas y un servicio confiable.</p>

                    <div class="about__main">
                        <article class="about__icons">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590492/4436557-200_rh1pw5.png" class="about__icon" />
                            <h3 class="about__title">Amplia selección</h3>
                            <p class="about__paragrah">Descubre una amplia variedad de restaurantes y tipos de cocina para satisfacer tus antojos.</p>
                        </article>

                        <article class="about__icons">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701590561/food-delivery-symbol-logo-37F3E64A34-seeklogo.com_lwzzn6.png" class="about__icon" />
                            <h3 class="about__title">Entrega rápida</h3>
                            <p class="about__paragrah">Nuestro servicio de entrega rápida garantiza que tu comida llegue fresca y deliciosa a tu puerta.</p>
                        </article>

                        <article class="about__icons">
                            <img src="https://res.cloudinary.com/dbb56iwkk/image/upload/v1701712357/116907_tiqgsd.png" class="about__icon" />
                            <h3 class="about__title">Seguridad y confianza</h3>
                            <p class="about__paragrah">Contamos con medidas de seguridad para garantizar que tu comida se entregue de manera segura y confiable.</p>
                        </article>
                    </div>
                </section>



            </main>

            <footer class="footer">
                <section class="footer__container container">
                    <nav class="nav nav--footer">
                        <h2 class="footer__title">Therion Delivery</h2>

                        <ul class="nav__link nav__link--footer">
                            <li class="nav__items">
                                <a href="#" class="nav__links">Inicio</a>
                            </li>
                            <li class="nav__items">
                                <a href="#" class="nav__links">Acerca de</a>
                            </li>
                            <li class="nav__items">
                                <a href="#" class="nav__links">Contacto</a>
                            </li>
                            <li class="nav__items">
                                <a href="#" class="nav__links">Descargar App</a>
                            </li>
                        </ul>
                    </nav>

                    <form class="footer__form" action="https://formspree.io/f/mknkkrkj" method="POST">
                        <h2 class="footer__newsletter">Suscribete a la newsletter</h2>
                        <div class="footer__inputs">
                            <input type="email" placeholder="Email:" class="footer__input" name="_replyto" />
                            <input type="submit" value="Registrate" class="footer__submit" />
                        </div>
                    </form>
                </section>

                <section class="footer__copy container">
                    <h3 class="footer__copyright">Derechos reservados &copy; Therion Delivery</h3>
                </section>
            </footer>
        </div>
    )
}
