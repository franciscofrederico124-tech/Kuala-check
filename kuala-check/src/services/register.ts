import url from "../hooks/url"

interface register_data {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
}

export default async function register({ first_name, last_name, email, password, confirm_password }: register_data) {

    const valid_email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);

    try {
        if (!first_name.trim() || first_name.trim().length < 3) {
            return {
                "success": false,
                "content": {
                    "message": "Insira correctamente o primeiro nome"
                }
            }
        }
        if (!last_name.trim() || last_name.trim().length < 3) {
            return {
                "success": false,
                "content": {
                    "message": "Insira correctamente o Segundo nome! "
                }
            }
        }
        if (!password.trim() || password.trim().length < 10) {
            return {
                "success": false,
                "content": {
                    "message": "Insira correctamente o a passoword! "
                }
            }
        }
        if (!confirm_password.trim() || confirm_password.trim().length < 10) {
            return {
                "success": false,
                "content": {
                    "message": "Insira correctamente a passwor d de confirmação! "
                }
            }
        }
        if (password.trim() !== confirm_password.trim()) {
            return {
                "success": false,
                "content": {
                    "message": "As password não coincidem! "
                }
            }
        }
        if (!email.trim() || email.trim().length < 5 || !valid_email) {
            return {
                "success": false,
                "content": {
                    "message": "Insira correctamente o email! "
                }
            }
        }

        const data = await fetch(`${url.apiBase}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            })
        });
        const response = await data.json();

        return response;
    }
    catch (error: any) {
        return {
            "success": false,
            "content": {
                "message": error.message
            }
        }
    }
}
