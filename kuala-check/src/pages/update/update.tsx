import style from "./update.module.css"
import "../../App.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import set_data from "../../tools/get_data"

import { useState, useEffect } from "react"
import { NavLink as Link } from "react-router-dom"

export default function Update() {
    const [data_account, set_data_account] = useState({
        "id": null,
        "name": "",
        "email": "",
        "first_name": "",
        "last_name": "",
    });

    useEffect(() => {
        (async () => {
            const data: any = await set_data();
            set_data_account(data.user);
        })();

    }, [])
    useState
    return (
        <section className="main-conatiner">
            <Header />
            <section className="container">
                <section className={style.container_update}>
                    <form className={style.card_update} autoComplete="off">
                        <h2>
                            Configurações de usuário <i className="bi bi-gear"></i>
                        </h2>
                        <section className={style.inputs}>
                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-person"></i>
                                </label>
                                <input type="text" placeholder="Primiero nome ( Novo )" value={data_account.first_name} />
                            </div>


                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-person"></i>
                                </label>
                                <input type="text" placeholder="Ultimo nome ( Novo )" value={data_account.last_name} />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-envelope-at-fill"></i>
                                </label>
                                <input type="email" placeholder="Email ( Novo )" value={data_account.email} />
                            </div>
                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-lock"></i>
                                </label>
                                <input type="password" placeholder="Password ( Actual )" />
                            </div>
                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-person"></i>
                                </label>
                                <input type="password" placeholder="Password ( Confirmação )" />
                            </div>
                        </section>
                        <section className={style.buttons}>
                            <div>
                                <button type="submit">
                                    Actualizar dados <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                            <div>
                                <button type="button">
                                    Remover conta <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </section>
                        <div className={style.new_account}>
                            {
                                data_account.name.toLowerCase() == "kuala admin" && (
                                    <Link to="/inicio/registo">
                                        Registe uma nova conta <i className="bi bi-person-plus"></i>
                                    </Link>
                                )
                            }
                        </div>
                    </form>
                </section>
            </section>
            <Footer />
        </section>
    )
}