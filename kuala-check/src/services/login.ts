import url from "../hooks/url";
import check_session from "./check_session"

interface login_data {
    email: string;
    password: string;
}


export default async function Login({ email, password }: login_data): Promise<string | undefined> {

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid_email = email_regex.test(email);

    try {
        if (!email.trim() || email.trim().length < 5 || !valid_email) {
            return "Insira um email válido! ";
        }
        if (!password.trim() || password.trim().length < 10) {
            return "Insira uma password válida! ";
        }

        const data = await fetch(`${url.apiBase}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const response : any = await data.json();
        console.log(response)
        return response;

    } catch (error: any) {
        console.log("| > Erro interno: ", error);
        return "Erro interno no sistema! ";
    }
}
