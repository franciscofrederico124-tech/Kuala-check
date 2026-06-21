import "../../App.css"
import style from "./como-funciona.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import items_cards from "../../hooks/como_funciona"

export default function Como_funciona() {
    return (
        <section className="main-conatiner">
            <Header />
            <section className="container">
                <section className={style.container_como_funciona}>
                    <h1>
                        Como funciona <i className="bi bi-question-circle"></i>
                    </h1>
                    <section className={style.cards_como_funciona}>
                        {items_cards.map((item) =>
                        (
                            <section className={style.card_como_funciona} key={item.title}>
                                <div className={style.title}>
                                    <span className={style.icon}>
                                        <i className={`bi ${item.icon || ""}`}></i>
                                    </span>
                                    <h3>
                                        {item.title}
                                    </h3>
                                </div>
                                <span className={style.cont}>
                                    {item.text}
                                </span>
                            </section>
                        ))
                        }
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    );
}