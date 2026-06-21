import "../../../App.css"
import style from "./login.module.css"
import Header from "../../../components/header/header"
import Footer from "../../../components/footer/footer"

import Logar from "../../../services/login"
import check_session from "../../../tools/check_session"
import nav from "../../../hooks/nav"

import { useState, useEffect } from "react"

export default function Login() {
    const [data_login, set_data_login] = useState({
        email: "",
        password: "",
    });



    useEffect(() => {
        set_data_login({
            email: "",
            password: "",
        })
    }, []);

    useEffect(() => {
        check_session();
    }, [data_login.email, data_login.password])

    return (
        <section className="main-continer">
            <Header />
            <section className="container">
                <section className={style.container_form}>
                    <form className={style.form} autoComplete="off" onSubmit={async (e) => {
                        e.preventDefault();
                        const email = data_login.email;
                        const password = data_login.password;
                        const res : any = await Logar({ email, password });
                        console.log(res.success);
                        if (res.success) nav("/inicio/dashboard");

                    }}>
                        <i className={`${style.icon} bi bi-person-circle `}></i>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-envelope-at-fill"></i>
                            </label>
                            <input type="email" placeholder="Email" onChange={(e) => {
                                set_data_login({
                                    ...data_login,
                                    email: e.target.value
                                });
                            }} value={data_login.email}
                                required
                                minLength={5}
                                maxLength={30}
                            />
                        </div>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-lock"></i>
                            </label>
                            <input type="password" placeholder="Password" onChange={(e) => {
                                set_data_login({
                                    ...data_login,
                                    password: e.target.value
                                });
                            }} value={data_login.password}
                                required
                                minLength={10}
                                maxLength={20}
                            />
                        </div>
                        <div>
                            <button className={style.button_login} type="submit">
                                Entrar <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </section>
            </section>
            <Footer />
        </section>
    )
}
