import "../../App.css"
import style from "./controller.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { useState, useEffect } from "react"

import set_water_pump from "../../services/set_water_pump"

export default function ControllerStatus() {
    const [status_pump, set_staus_pump] = useState(false);
    const [quantity, set_quantity] = useState<number>(10);
    const [time, setTime] = useState<number>(600);
    const vz = 1 / 30;

    useEffect(() => {
        if (!status_pump) {
            const time_calc: number = Math.round(quantity / vz);
            setTime(time_calc);
        }
    }, [quantity, status_pump]);

    useEffect(() => {
        let cronometro: any;

        if (status_pump && time > 0) {
            cronometro = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(cronometro);
                        set_staus_pump(false);
                        set_water_pump(false);
                        set_quantity(0);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(cronometro);
    }, [status_pump, time]);

    const renderTime = (time / 60).toFixed(1);

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
                            <h3>Bomba de irrigação</h3>
                            <h1>
                                {
                                    status_pump ? (
                                        <>Ligada <sub>( On )</sub></>
                                    ) : (
                                        <>Desligada <sub>( Off )</sub></>
                                    )
                                }
                            </h1>
                            <div>
                                <input
                                    value={quantity}
                                    type="range"
                                    name="percent"
                                    id="percent"
                                    min={0}
                                    max={20}
                                    disabled={status_pump}
                                    onChange={(e) => set_quantity(+e.target.value)}
                                />
                            </div>
                            <div className={style.controll_items}>
                                <span
                                    className={`${style.switch} ${status_pump ? style.switch_on : style.switch_off} ${!(quantity > 0) ? style.switch_disabled : ""}`}
                                    onClick={() => {
                                        if (quantity == 0) {
                                            return;
                                        }
                                        else {
                                            set_staus_pump(!status_pump);
                                            set_water_pump(!status_pump);
                                        }
                                    }}
                                >
                                </span>
                                <h1 className={style.quantity}>
                                    {quantity}
                                    <sub>
                                        litros - ( {renderTime}min )
                                    </sub>
                                </h1>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
        </section >
    );
}
