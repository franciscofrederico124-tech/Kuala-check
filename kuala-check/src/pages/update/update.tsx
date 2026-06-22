import style from "./update.module.css"
import "../../App.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import set_data from "../../tools/get_data"
import updateAccount from "../../services/update"
import remove_account from "../../services/remove_account"

import { useState, useEffect, FormEvent } from "react"
import { NavLink as Link } from "react-router-dom"

interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    current_password: string;
    new_password: string;
    new_confirm_password: string;
}

interface FeedbackState {
    message: string;
    type: "success" | "error" | "";
}

export default function Update() {
    const [data_account, set_data_account] = useState({
        id: null,
        name: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const [formData, setFormData] = useState<FormState>({
        first_name: "",
        last_name: "",
        email: "",
        current_password: "",
        new_password: "",
        new_confirm_password: "",
    });

    const [feedback, setFeedback] = useState<FeedbackState>({
        message: "",
        type: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            const data: any = await set_data();
            if (data?.user) {
                set_data_account(data.user);
                setFormData({
                    first_name: data.user.first_name || "",
                    last_name: data.user.last_name || "",
                    email: data.user.email || "",
                    current_password: "",
                    new_password: "",
                    new_confirm_password: "",
                });
            }
        })();
    }, [])

    const handleSubmit = async () => {

        setFeedback({ message: "", type: "" });
        setIsSubmitting(true);

        const res: any = await updateAccount({
            new_name: formData.first_name,
            new_last_name: formData.last_name,
            new_email: formData.email,
            current_password: formData.current_password,
            new_password: formData.new_password,
            new_confirm_password: formData.new_confirm_password,
        });

        setIsSubmitting(false);

        if (res?.success) {
            setFeedback({
                message: res.content?.message || "Dados atualizados com sucesso!",
                type: "success"
            });
            set_data_account((prev) => ({
                ...prev,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
            }));
            setFormData((prev) => ({ ...prev, current_password: "", new_password: "", new_confirm_password: "" }));
        }
        else {
            setFeedback({
                message: res?.content?.message || "Erro ao atualizar os dados. Tente novamente.",
                type: "error"
            });
        }
    }

    const deleteAccount = async () => {
        setFeedback({ message: "", type: "" });
        const res: any = await remove_account();

        if (res) {
            setFeedback({
                message: res.content?.message || "Conta removida com sucesso!",
                type: res.success ? "success" : "error"
            });
            res.success && setTimeout(() => {
                window.location.href = "/auth/login";
            }, 2000);
        }
    };

    return (
        <section className="main-conatiner">
            <Header />
            <section className="container">
                <section className={style.container_update}>
                    <form className={style.card_update} autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <h2>
                            Configurações de usuário <i className="bi bi-gear"></i>
                        </h2>
                        <section className={style.inputs}>
                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-person"></i>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Primeiro nome (Novo)"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    minLength={3}
                                    required
                                />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-person"></i>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Último nome (Novo)"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    minLength={3}
                                    required
                                />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-envelope-at-fill"></i>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email (Novo)"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-lock"></i>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password actual"
                                    value={formData.current_password}
                                    onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-lock"></i>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nova password"
                                    value={formData.new_password}
                                    onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                    minLength={10}
                                    required
                                />
                            </div>

                            <div className={style.input}>
                                <label className={style.icon}>
                                    <i className="bi bi-lock"></i>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirmar nova password"
                                    value={formData.new_confirm_password}
                                    onChange={(e) => setFormData({ ...formData, new_confirm_password: e.target.value })}
                                    minLength={10}
                                    required
                                />
                            </div>
                        </section>
                        <section className={style.buttons}>
                            <div>
                                <button className={style.button_submit} type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "A atualizar..." : "Actualizar dados"} <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                            <div>
                                <button className={style.button_remove} onClick={deleteAccount} type="button">
                                    Remover conta <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </section>
                        {feedback.message && (
                            <div className={`${style.status_message} ${feedback.type === "success" ? style.success : style.error}`}>
                                {feedback.message}
                            </div>
                        )}
                        <div className={style.new_account}>
                            {data_account.name?.toLowerCase() === "kuala admin" && (
                                <Link to="/inicio/registo">
                                    Registe uma nova conta <i className="bi bi-person-plus"></i>
                                </Link>
                            )}
                        </div>
                    </form>
                </section>
            </section>
            <Footer />
        </section>
    )
}