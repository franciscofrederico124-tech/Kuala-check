import url from "../hooks/url";

export default async function log_out() {
    try {
        const data: any = await fetch(`${url.apiBase}/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        const res = await data.json();
        if (res) {
            return res;
        }
        else {
            return res.status(500).json({
                success: false,
                status: 500,
                content: {
                    message: "Erro no sistema! ",
                }
            })
        }
    }
    catch (error: any) {
        return {
            "success": false,
            "content": {
                "message": error.message,
            }
        }
    }
}