import { useState, useEffect } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import check_session from "../../tools/check_session";
import logo from "../../public/image/logo.png";

export default function Header() {
    const nav = useNavigate();
    const [isLogged, setIsLogged] = useState<boolean | null>(null);

    useEffect(() => {
        async function verify() {
            const session = await check_session();
            setIsLogged(session === true);
        }
        verify();
    }, []);

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src={logo} alt="Logo" />
                <h2>Kuala Check</h2>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/inicio" className={({ isActive }) => isActive ? style.active : ""}>
                            <i className="bi bi-house-fill"></i> Início
                        </Link>
                    </li>
                    <li>
                        <Link to="/sobre" className={({ isActive }) => isActive ? style.active : ""}>
                            <i className="bi bi-info-circle-fill"></i> Sobre
                        </Link>
                    </li>
                    <li>
                        <Link to="/como-funciona" className={({ isActive }) => isActive ? style.active : ""}>
                            <i className="bi bi-question-circle-fill"></i> Como funciona
                        </Link>
                    </li>
                    
                    {isLogged && (
                        <li>
                            <button className={style.profile} onClick={() => nav("/inicio/perfil")}>
                                <i className="bi bi-person-fill"></i>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}