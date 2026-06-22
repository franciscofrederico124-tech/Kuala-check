import url from "../hooks/url"

export default async function set_water_pump(new_tatus: boolean) {
    try {
        const data = await fetch(`${url.apiBase}/system/set_water_pump`, {
            method: "GET",
            credentials: "include",
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