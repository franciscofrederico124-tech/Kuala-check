import "../../App.css"
import style from "./monitoring.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import set_data from "../../tools/get_data";
import { useState, useEffect } from "react";

export default function Monitoring() {

    const ait_status = [
        "Bom",
        "mal",
        "Ruim"
    ]
    const [data_card, set_data_card] = useState([
        {
            "key": "temperature",
            "title": "Temperatura",
            "icon": "bi bi-thermometer",
            "value": "..",
            "unit": "ºC",
        },
        {
            "key": "humidity",
            "title": "Humidade",
            "icon": "bi bi-droplet",
            "value": "..",
            "unit": "",
        },
        {
            "key": "air",
            "title": "Qualidade do ar",
            "icon": "bi bi-wind",
            "value": "..",
            "unit": "",

        },
        {
            "key": "soil",
            "title": "Qualidade do solo",
            "icon": "bi bi-tree",
            "value": "..",
            "unit": ""
        },
        {
            "key": "rain",
            "title": "Chuva",
            "icon": "bi bi-cloud-rain",
            "value": "..",
            "unit": ""
        }
    ])

    useEffect(() => {
        const timer = setInterval(() => {
            (async () => {
                const data = await set_data();
                console.log(data.system_data.sensors);

                set_data_card([
                    {
                        "key": "temperature",
                        "title": "Temperatura",
                        "icon": "bi bi-thermometer",
                        "value": data.system_data.sensors.air_temperature || "..",
                        "unit": "ºC",
                    },
                    {
                        "key": "humidity",
                        "title": "Humidade",
                        "icon": "bi bi-droplet",
                        "value": data.system_data.sensors.air_humidity,
                        "unit": "%",
                    },
                    {
                        "key": "air",
                        "title": "Qualidade do ar",
                        "icon": "bi bi-wind",
                        "value": data.system_data.sensors.air_sensor >= 0 && data.system_data.sensors.air_sensor < 50
                            ? "Boa"
                            : data.system_data.sensors.air_sensor >= 50 && data.system_data.sensors.air_sensor < 750
                                ? "Normal"
                                : data.system_data.sensors.air_sensor >= 750 && data.system_data.sensors.air_sensor <= 1023
                                    ? "Perigo"
                                    : "..",
                        "unit": data.system_data.sensors.air_sensor >= 0 && data.system_data.sensors.air_sensor < 50
                            ? "(0 - 49 PPM)"
                            : data.system_data.sensors.air_sensor >= 50 && data.system_data.sensors.air_sensor < 750
                                ? "(50 - 749 PPM)"
                                : data.system_data.sensors.air_sensor >= 750 && data.system_data.sensors.air_sensor <= 1023
                                    ? "(750 - 1023 PPM)"
                                    : "",
                    },
                    {
                        "key": "soil",
                        "title": "Qualidade do solo",
                        "icon": "bi bi-tree",
                        "value": data.system_data.sensors.soil_humidity ? "Solo seco" : "Solo húmido",
                        "unit": ""
                    },
                    {
                        "key": "rain",
                        "title": "Chuva",
                        "icon": "bi bi-cloud-rain",
                        "value": data.system_data.sensors.rain_sensor ? "Não dectetada" : "Dectetada",
                        "unit": ""
                    }
                ])
            })()

        }, 400);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="main-container">
            <Header />
            <section className="container">
                <section className={style.monitoring_container}>
                    <h1 className={style.title}>
                        Dados ambientais <i className="bi bi-cloud-sun"></i>
                    </h1>
                    <section className={style.data_cards}>
                        {
                            data_card.map((card) => (
                                <div className={style.data_card} key={card.key}>
                                    <h3>
                                        <span>{card.title}</span>
                                        <i className={card?.icon}></i>
                                    </h3>
                                    <h1>
                                        {card.value}
                                        {card?.unit && <i>{card.unit}</i>}
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
