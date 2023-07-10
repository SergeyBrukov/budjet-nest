import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {TPagination, TTransaction, TTransactionExpenseIncomeGroup} from "../../utils/types.ts";
import axios from "axios";
import {headerFetchTokenBearer} from "../../utils/customFunck.ts";
import {notify} from "../../components/elements/toastify/toastify.ts";
import {TypeToastify} from "../../utils/enum.ts";
import {ICreateTransaction} from "../../utils/inteface.ts";


type TSearchParamsTransactionStore =  Omit<TPagination, "totalAmount"> & {
    search: string
}

interface ITransactionStore {
    loading: boolean,
    transactions: TTransaction[],
    transactionExpenseIncomeGroup: TTransactionExpenseIncomeGroup,
    fetchTransaction: (data: TSearchParamsTransactionStore) => void,
    createTransaction: (data: ICreateTransaction) => void,
    deleteTransaction: (id: number) => void,
    totalAmount: number
}

interface ITransactionFilter {
    pagination: Omit<TPagination, "totalAmount">,
    handleChangePage: (page: number) => void
}

export const useTransactionStore = create(immer<ITransactionStore>((set, getState) => ({
    loading: false,
    transactions: [],
    transactionExpenseIncomeGroup: {
        totalIncome: 0,
        totalExpense: 0
    },
    totalAmount: 0,

    fetchTransaction: async (data: TSearchParamsTransactionStore) => {

        const queryString = new URLSearchParams({
            page: String(data.page),
            pageLimit: String(data.pageLimit),
            search: String(data.search)
        });

        try {
            set({loading: true});
            const response = await axios(`/transaction/pagination?${queryString}`, headerFetchTokenBearer())

            const {totalAmount, transactions, transactionExpenseIncomeGroup} = response.data

            set({totalAmount, transactions, transactionExpenseIncomeGroup})

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
        } finally {
            set({loading: false})
        }
    },

    createTransaction: async (data) => {
        try {
            set({loading: true});
            const response = await axios.post(`/transaction/`, data, headerFetchTokenBearer())

            set(state => {
                state.transactions.push(response.data.transaction);
                state.transactionExpenseIncomeGroup = response.data.transactionExpenseIncomeGroup
            })

            notify("Transaction has been create", TypeToastify.SUCCESS)

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
        } finally {
            set({loading: false})
        }
    },

    deleteTransaction: async (id: number) => {
        try {
            const response = await axios.delete(`/transaction/transaction/${id}`, headerFetchTokenBearer());

            if(response.status === 200) {

                const transaction = getState().transactions.find(transaction => transaction.id === id);

                notify("Transaction has been delete", TypeToastify.SUCCESS)
                set(state => {
                    state.transactions = state.transactions.filter(transaction => transaction.id !== id);
                })

                set(state => {

                    if(transaction?.type === "expense") {
                        state.transactionExpenseIncomeGroup = {
                            ...state.transactionExpenseIncomeGroup,
                            totalExpense: state.transactionExpenseIncomeGroup.totalExpense - transaction.amount
                        }
                    }else  {
                        state.transactionExpenseIncomeGroup = {
                            ...state.transactionExpenseIncomeGroup,
                            totalIncome: state.transactionExpenseIncomeGroup.totalIncome - transaction!.amount
                        }
                    }
                })
            }

        } catch (error: any) {
            notify(error.response.data.message, TypeToastify.ERROR)
        }
    }
})))


export const useTransactionFilter = create(immer<ITransactionFilter>((set) => ({
    pagination: {
        page: 1,
        pageLimit: 10,
    },
    handleChangePage: (page) => {
        set(state => {
            state.pagination.page = page
        })
    }
})))