import "../../App.css"
import style from "./home.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const nav = useNavigate();
    return (
        <section className="main-container">
            <Header />
            <section className="container">
                <section className={style.container_home}>
                    <div className={style.card_main}>
                        <h2>
                            Kuala Chack - Sistema de Monitoramento ambiental
                        </h2>
                        <p>
                            Uma plataforma capaz de monitorar o ambiente, de uma forma eficiente e em tempo real.
                        </p>
                        <button className={style.button_start} onClick={() => nav("/inicio/login")}>
                            Acessar <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </section>
            </section>
            <Footer />
        </section>
    )
}