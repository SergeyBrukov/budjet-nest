import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {IUserLogin, IUserRegister} from "../../utils/inteface.ts";
import axios from "axios";
import {notify} from "../../components/elements/toastify/toastify.ts";
import {TypeToastify} from "../../utils/enum.ts";

interface IUserStore {
    token: string | null,
    userName: string | null,
    email: string | null,
    handleCreateUser: (data: IUserRegister) => Promise<number>,
    loading: boolean,
    status: number | null,
    handleLogin: (data: IUserLogin) => Promise<number>,
    handleProfile: () => void,
    handleLogout: () => void
}

export const useUserStore = create(immer<IUserStore>((set, getState) => ({
    token: localStorage.getItem("token") || null,
    email: null,
    userName: null,
    loading: false,
    status: null,

    handleCreateUser: async (data: IUserRegister) => {
        set({loading: true})
        try {
            const response = await axios.post("/user", data);

            const {token, user: {userName, email}} = response.data;

            set({token, userName, email, status: response.status})

            localStorage.setItem("token", token)

            notify("Successfuly registration", TypeToastify.SUCCESS)

            return response.status

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
            set({status: error.response.status})

            return error.response.status
        } finally {
            set({loading: false})
        }
    },

    handleLogin: async (data: IUserLogin) => {
        set({loading: true})
        try {

            const response = await axios.post("/auth/login", data);

            const {token, user: {userName, email}} = response.data;

            set({token, userName, email, status: response.status})

            localStorage.setItem("token", token)

            return response.status

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
            set({status: error.response.status})

            return error.response.status
        } finally {
            set({loading: false})
        }
    },

    handleProfile: async () => {
        const response = await axios('auth/profile', {
            headers: {
                authorization: `Bearer ${getState().token}`
            }
        })

        const {userName, email} = response.data;

        set({userName, email, status: response.status})
    },

    handleLogout: () => {
        localStorage.removeItem("token")
        set({token: null, email: null, userName: null})
    }
})))