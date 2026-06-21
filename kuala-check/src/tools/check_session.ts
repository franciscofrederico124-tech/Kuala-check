import url from "../hooks/url"
import get_data from "./get_data";

interface fecth_data {
    success: boolean,
    user: any,
}

export default async function check_session() {
    try {
        const res = await get_data();

        if (res && res.user) {
            return res.success;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("| Erro na verficação: ", error);
        return false;
    }
}