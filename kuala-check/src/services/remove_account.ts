import url from "../hooks/url"

export default async function remove_account() {
    try {
        const response = await fetch(`${url.apiBase}/remove_account`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data;
    } catch (error) {

        return {
            success: false, 
            content: {
                message: "Ocorreu um erro ao remover a conta"
            }
        };
    }
}