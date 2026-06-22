import url from "../hooks/url"

interface update_data {
    new_name: string,
    new_last_name: string,
    new_email: string,
    current_password: string,
    new_password: string,
    new_confirm_password: string,
}

export default async function update({ new_name, new_last_name, new_email, current_password, new_password, new_confirm_password }: update_data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedName = new_name.trim();
    const trimmedLastName = new_last_name.trim();
    const trimmedEmail = new_email.trim();
    const trimmedCurrent = current_password.trim();
    const trimmedNewPassword = new_password.trim();
    const trimmedConfirm = new_confirm_password.trim();

    try {
        if (!trimmedName || trimmedName.length < 3) {
            return {
                success: false,
                content: { message: "Insira correctamente o primeiro nome" }
            }
        }

        if (!trimmedLastName || trimmedLastName.length < 3) {
            return {
                success: false,
                content: { message: "Insira correctamente o ultimo nome" }
            }
        }

        if (!trimmedEmail || trimmedEmail.length < 5 || !emailRegex.test(trimmedEmail)) {
            return {
                success: false,
                content: { message: "Insira um email válido" }
            }
        }

        if (!trimmedCurrent || trimmedCurrent.length < 10) {
            return {
                success: false,
                content: { message: "Insira a password actual" }
            }
        }

        if (!trimmedNewPassword || trimmedNewPassword.length < 10) {
            return {
                success: false,
                content: { message: "A nova password deve ter pelo menos 10 caracteres" }
            }
        }

        if (!trimmedConfirm || trimmedConfirm.length < 10) {
            return {
                success: false,
                content: { message: "Confirme a password corretamente" }
            }
        }

        if (trimmedNewPassword !== trimmedConfirm) {
            return {
                success: false,
                content: { message: "As passwords não coincidem" }
            }
        }

        const payload = {
            data: {
                new_name: trimmedName,
                new_last_name: trimmedLastName,
                new_email: trimmedEmail,
                current_password: trimmedCurrent,
                new_password: trimmedNewPassword,
                new_confirm_password: trimmedConfirm,
            }
        }

        const response = await fetch(`${url.apiBase}/update`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return data;
    }
    catch (error: any) {
        return {
            success: false,
            content: { message: error?.message || "Erro interno no sistema" }
        }
    }
}