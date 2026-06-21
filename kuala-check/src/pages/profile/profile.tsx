import style from "./profile.module.css"
import "../../App.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import get_data from "../../tools/get_data"
import log_out from "../../services/log_out"
import nav from "../../hooks/nav"


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const [user, setUser] = useState({
        id: "__",
        name: "Visitante",
        email: "**************@gmail.com"
    });

    const nav = useNavigate();

    useEffect(() => {
        const Get_data = async () => {
            {
                const data: any = await get_data();
                console.log(data)
                setUser(data.user || {
                    id: "__",
                    name: "Visitante",
                    email: "**************@gmail.com"
                });
            }
        }
        Get_data();
    }, [nav])
    return (
        <section className="main-conatiner">
            <Header />
            <section className="container">
                <section className={style.container_profile}>
                    <section className={style.card_profile}>
                        <div className={style.title}>
                            <h1>
                                {user.name.trim()[0].toLocaleUpperCase()}
                            </h1>
                        </div>
                        <div className={style.personal_data}>
                            <div className={style.grid_layout}>
                                <div className={style.basic_data}>
                                    <span>
                                        <i className="bi bi-person"></i>
                                        {user.name}
                                    </span>
                                    <span>
                                        <i className="bi bi-envelope-at-fill"></i>
                                        {user.email}
                                    </span>
                                    <span>
                                        <i className="bi bi-hash"></i>
                                        {user.id}
                                    </span>
                                </div>
                                <div className={style.actions}>
                                    <button className={style.log_out} onClick={ async() => {
                                        const res = await log_out();
                                        console.log(res); 
                                        if (res.success) nav("/")
                                    }}>
                                        Terminar sessão <i className="bi bi-box-arrow-in-right"></i>
                                    </button>
                                    <button onClick={() => nav("/inicio/conta")}>
                                        Definições da conta <i className="bi bi-gear"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    )
}