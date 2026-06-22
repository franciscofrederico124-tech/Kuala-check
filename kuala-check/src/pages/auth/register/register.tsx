import "../../../App.css"
import style from "./register.module.css"
import Header from "../../../components/header/header"
import Footer from "../../../components/footer/footer"

import register from "../../../services/register"

import { useState, useEffect } from "react"
import nav from "../../../hooks/nav"

interface FeedbackState {
    message: string;
    type: "success" | "error" | "";
}

export default function Register() {
    const [data, set_data] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    })

    const [feedback, setFeedback] = useState<FeedbackState>({
        message: "",
        type: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        set_data({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
        })
    }, []);

    return (
        <section className="main-continer">
            <Header />
            <section className="container">
                <section className={style.container_form}>
                    <form className={style.form} autoComplete="off" onSubmit={async (e) => {
                        e.preventDefault();
                        setFeedback({ message: "", type: "" });
                        setIsSubmitting(true);

                        const first_name = data.first_name;
                        const last_name = data.last_name;
                        const email = data.email;
                        const password = data.password;
                        const confirm_password = data.confirm_password;

                        const res: any = await register({ first_name, last_name, email, password, confirm_password });
                        setIsSubmitting(false);

                        if (res?.success) {
                            nav("/perfil");
                        } else {
                            setFeedback({
                                message: res?.content?.message || "Erro ao registar. Tente novamente.",
                                type: "error"
                            });
                        }
                    }}>
                        <i className={`${style.icon} bi bi-person-plus`}></i>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-person"></i>
                            </label>
                            <input type="text" placeholder="Primeiro Nome"
                                value={data.first_name}
                                onChange={(e) => {
                                    set_data({
                                        ...data,
                                        first_name: e.target.value,
                                    })
                                }}
                                minLength={3}
                                maxLength={15}
                                required
                            />
                        </div>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-person"></i>
                            </label>
                            <input type="text" placeholder="Ultimo  Nome" value={data.last_name}
                                onChange={(e) => {
                                    set_data({
                                        ...data,
                                        last_name: e.target.value,
                                    })
                                }}
                                minLength={3}
                                maxLength={15}
                                required
                            />
                        </div>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-envelope-at-fill"></i>
                            </label>
                            <input type="email" placeholder="Email" value={data.email}
                                onChange={(e) => {
                                    set_data({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }}
                                required
                                minLength={5}
                                maxLength={30}
                            />
                        </div>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-lock"></i>
                            </label>
                            <input type="password" placeholder="Nova password" value={data.password}
                                onChange={(e) => {
                                    set_data({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }}
                                required
                                minLength={10}
                            />
                        </div>
                        <div className={style.input}>
                            <label>
                                <i className="bi bi-lock"></i>
                            </label>
                            <input type="password" placeholder="Confirma a password" value={data.confirm_password}
                                onChange={(e) => {
                                    set_data({
                                        ...data,
                                        confirm_password: e.target.value,
                                    })
                                }}
                                required
                                minLength={10}
                            />
                        </div>
                        {feedback.message && (
                            <div className={`${style.status_message} ${feedback.type === "success" ? style.success : style.error}`}>
                                {feedback.message}
                            </div>
                        )}
                        <div>
                            <button className={style.button_register} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Enviando..." : "Registar"} <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </section>
            </section>
            <Footer />
        </section>
    )
}