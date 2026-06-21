import "../../App.css"
import style from "./monitoring.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { useNavigate } from "react-router-dom"

import { useState } from "react"

export default function Monitoring() {
    const [data_card, set_data_card] = useState([
        {
            "key": "temperature",
            "title": "Temperatura",
            "icon": "bi bi-thermometer",
            "value": "30.3",
            "unit": "C",
        },
        {
            "key": "Humidity",
            "icon": "",
            "title": "Humidade",
            "value": "30",
            "unit": "%",
        },
        {
            "key": "air",
            "icon": "",
            "title": "Q. ar",
            "value": "350",
            "unit": "% concetrado",
        }
    ])
    return (
        <section className="main-container">
            <Header />
            <section className="container">
                <section className={style.monitoring_container}>
                    <h1 className={style.title}>
                        Dados ambientais <i className="bi bi bi-cloud-sun"></i>
                    </h1>
                    <section className={style.data_cards}>
                        {
                            data_card.map((card) => (
                                <div className={style.data_card} key={card.key}>
                                    <h3>
                                        {card.title} <i className={card?.icon}></i>
                                    </h3>
                                    <h1>
                                        {card.value}
                                        <sub>
                                            {card?.unit}
                                        </sub>
                                    </h1>
                                </div>
                            ))
                        }
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    )
}