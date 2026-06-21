import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import check_session from "../tools/check_session";

interface check_data {
    children: any;
    reffer?: string;
}

export default function Checksession({ children, reffer = "/" }: check_data) {
    const [logged, set_logged] = useState<boolean | null>(null);
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function verify() {
            const session = await check_session();
            set_logged(session === true);
        }
        verify();
    }, []);

    useEffect(() => {
        if (logged === null) return;

        const rotasPrivadas = ["/inicio/registo", "/inicio/conta", "/inicio/dashboard", "/inicio/perfil"];
        const estaNaRotaPrivada = rotasPrivadas.includes(location.pathname);

        if (logged && (reffer === "/login" || reffer === "/home")) {
            nav("/inicio/dashboard");
        } else if (!logged && estaNaRotaPrivada) {
            nav("/inicio/login");
        }
    }, [logged, reffer, nav, location.pathname]);

    if (logged === null) {
        return <div>Carregando...</div>;
    }

    return children;
}