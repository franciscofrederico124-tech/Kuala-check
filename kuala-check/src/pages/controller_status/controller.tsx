import "../../App.css"
import style from "./controller.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function ControllerStatus() {
    const [status_pump, set_staus_pump] = useState(false);

    return (
        <section className="main-container">
            <Header />
            <section className="container">
                <section className={style.controller_container}>
                    <h1>
                        Controle de sistemas <i className="bi bi-cpu-fill"></i>
                    </h1>
                    <section className={style.data_cards}>
                        <section className={style.data_card}>
                            <h3>
                                Bomba de irrigação
                            </h3>
                            <h1>
                                {
                                    status_pump ? (
                                        <>
                                            Ligada  <sub>( Off )</sub>
                                        </>
                                    ) : (
                                        <>
                                            Desligada  <sub>( Off )</sub></>
                                    )
                                }
                            </h1>
                            <div>
                                <input type="range" name="percent" id="percent" />
                                <span className={`${style.switch} ${status_pump ? style.switch_on : style.switch_off}`} onClick={() => {
                                    set_staus_pump(!status_pump);
                                }}>
                                </span>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
        </section >
    )
}