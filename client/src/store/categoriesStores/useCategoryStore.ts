import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {TCategory} from "../../utils/types.ts";
import {notify} from "../../components/elements/toastify/toastify.ts";
import {TypeToastify} from "../../utils/enum.ts";
import axios from "axios";
import {headerFetchTokenBearer} from "../../utils/customFunck.ts";

interface ICategoryStore {
    loading: boolean,
    categories: TCategory[],
    fetchCategory: () => void,
    deleteCategory: (id: number) => void,
    changeCategory: (title: string, id: number) => Promise<number>,
    createCategory: (title: string) => Promise<number>
}

export const useCategoryStore = create(immer<ICategoryStore>((set) => ({
    loading: false,
    categories: [],
    fetchCategory: async () => {
        set({loading: true});
        try {
            const response = await axios("/categories", headerFetchTokenBearer())

            set({categories: response.data})
        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
        } finally {
            set({loading: false})
        }
    },

    changeCategory: async (title: string, id: number) => {
        try {
            const response = await axios.patch(`/categories/categories/${id}`, {title}, headerFetchTokenBearer())

            if (response.status === 200) {
                set(state => {
                    state.categories = state.categories.map(category => {
                        if (category.id === id) {
                            return {
                                ...category,
                                title
                            }
                        }
                        return category;
                    })
                })
                notify("Category has been change", TypeToastify.SUCCESS);
            }

            return response.status;

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR);
            return error.response.status;
        }
    },
    createCategory: async (title) => {
        try {
            set({loading: true});

            const response = await axios.post("/categories", {title}, headerFetchTokenBearer())

            const {id, title: categoryTitle} = response.data;

            set(state => {
                state.categories.push({id, title: categoryTitle})
            });

            return response.status

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)

            return error.response.status
        } finally {
            set({loading: false})
        }
    },
    deleteCategory: async (id: number) => {
        try {
            const response = await axios.delete(`categories/categories/${id}`, headerFetchTokenBearer());
            if (response.status === 200) {
                set(state => {
                    state.categories = state.categories.filter(category => category.id !== id);
                })
                notify("Transaction has been delete", TypeToastify.SUCCESS);
            }
        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
        } finally {
            set({loading: false})
        }
    }
})))