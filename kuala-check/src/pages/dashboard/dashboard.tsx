import style from "./dashboard.module.css"
import "../../App.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const nav = useNavigate();
    return (
        <section className="main-container">
            <Header />
            <section className="container">
                <section className={style.dashbord_container}>
                    <section className={style.controlls}>
                        <div className={style.controll_card} onClick={() => { nav("/inicio/dashboard/monitoramento") }}>
                            <span className={style.icon}>
                                <i className="bi bi-eye">  </i>
                            </span>
                            <h2>Monitorar Estados</h2>
                        </div>
                        <div className={style.controll_card} onClick={() => { nav("/inicio/dashboard/controle") }}>
                            <span className={style.icon}>
                                <i className="bi bi-sliders" > </i>
                            </span>
                            <h2>Controlar estados </h2>
                        </div>
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    );
}