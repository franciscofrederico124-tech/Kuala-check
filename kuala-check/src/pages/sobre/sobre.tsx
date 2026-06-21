import style from "./sobre.module.css"
import "../../App.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"

export default function Sobre() {
    return (
        <section className="main-conatiner">
            <Header />
            <section className="container">
                <section className={style.container_sobre}>
                    <section className={style.card_sobre}>
                        <div className={style.logo}>
                            <img src="/public/image/logo.png" alt="Logo" />
                        </div>
                        <div className={style.cont_sobre}>
                            <h1>
                                Sobre Kuala Check <i className="bi bi-info-circle-fill"></i>
                            </h1>
                            <span>
                                Kuala Check é um projecto de Monitoramento ambiental que usa Tecnologia para cuidar do ambiente. Inspirado no meio rural, acompanha clima, solo e água para tomada de decisões sutentáveis.
                            </span>
                            <i>
                                Kuala Check - monitorar hoje para preservar amanhã.
                            </i>
                        </div>
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    )
}