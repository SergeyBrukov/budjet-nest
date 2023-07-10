export type TRouter = {
    path: string,
    element: string
}

export type TNavRouters = {
    path: string,
    name: string
}

export type TCategory = {
    id:number,
    title: string
}

export type TTransaction = {
    id: number
    title: string
    type: string
    amount: number
    createAt: string
}

export type TTransactionExpenseIncomeGroup = {
    totalExpense: number,
    totalIncome: number
}

export type TPagination = {
    page: number,
    pageLimit: number,
    totalAmount: number
}
