import url from "../hooks/url"

export default async function set_water_pump(command: number) {
    try {
        const data = await fetch(`${url.apiBase}/system/set_water_pump`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                "command": command,
            }),
        });

        const response: any = await data.json();
        console.log(response)
        return response;

    }
    catch (error: any) {
        return {
            "sucess": false,
            "content": {
                "message": "Erro no sistema! ",
            }
        }
    }
}