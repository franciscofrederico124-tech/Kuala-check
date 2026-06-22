import url from "../hooks/url"

export default async function set_data() {
    try {
        const data = await fetch(`${url.apiBase}/system/me`, {
            method: "GET",
            credentials: "include",
        })
        const res = await data.json();
        return res;
    }
    catch (error) {
        return { user: null }
    }
}
