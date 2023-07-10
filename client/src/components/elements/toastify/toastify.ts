import {TypeToastify} from "../../../utils/enum.ts";
import {toast} from "react-toastify";

export const notify = (text: string = "Something happened", type: TypeToastify) => {
    switch (type) {
        case TypeToastify.INFO :
            return (
                toast.info(text, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                )
            )
        case TypeToastify.SUCCESS:
            return (
                toast.success(text, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                )
            )
        case TypeToastify.WARNING:
            return (
                toast.warn(text, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                )
            )
        case TypeToastify.ERROR:
            return (
                toast.error(text, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                )
            )

        default:
            return (
                toast(text, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                )
            )
    }
};