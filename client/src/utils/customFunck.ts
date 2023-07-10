import {notify} from "../components/elements/toastify/toastify.ts";
import {TypeToastify} from "./enum.ts";

const headerFetchTokenBearer = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        notify("Access denied", TypeToastify.ERROR)
        return;
    }

    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
}


export {
    headerFetchTokenBearer
}