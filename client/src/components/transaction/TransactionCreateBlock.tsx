import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {AiOutlinePlus} from "react-icons/ai";
import CategoryCreateFormModal from "../category/CategoryCreateFormModal.tsx";
import {ICreateTransaction} from "../../utils/inteface.ts";
import {useCategoryStore} from "../../store/categoriesStores/useCategoryStore.ts";
import {useTransactionStore} from "../../store/transactionStores/useTransactionStore.ts";


const TransactionCreateBlock = () => {

    const {fetchCategory, categories} = useCategoryStore(store => store);
    const {createTransaction, transactionExpenseIncomeGroup: {totalIncome, totalExpense}} = useTransactionStore(store => store)

    const [visibleCategoryCreateForm, setVisibleCategoryCreateForm] = useState(false);

    const validateFieldCreateTransaction = yup.object().shape({
        title: yup.string().required("This field can not be empty"),
        amount: yup.number().typeError("This field must be a number").required("This field can not be empty"),
        type: yup.string().required("This field can not be empty"),
        category: yup.string().required("This field can not be empty")
    })

    const {handleSubmit, register, formState: {errors}} = useForm<ICreateTransaction>({
        mode: "all", resolver: yupResolver(validateFieldCreateTransaction), defaultValues: {
            type: "income"
        }
    })

    const handleTransactionSubmitForm: SubmitHandler<ICreateTransaction> = (data) => {
        createTransaction(data)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className="flex gap-x-[15px]">
            <CategoryCreateFormModal visible={visibleCategoryCreateForm} setVisible={setVisibleCategoryCreateForm}/>
            <div className="p-5 rounded-xl bg-gray-900 w-full">
                <form onSubmit={handleSubmit(handleTransactionSubmitForm)} className="flex items-center flex-col max-w-[600px] mx-auto bg-gray-900 border-gray-200 rounded-[15px]">
                    <div className="mb-[40px] w-full relative">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium  dark:text-white">Title</label>
                        <input {...register("title")} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        {(errors && errors.title) &&
                          <span className="text-red-700 absolute mt-2">{errors.title.message}</span>}
                    </div>
                    <div className="mb-[40px] w-full relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">Amount</label>
                        <input defaultValue="0" {...register("amount")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        {(errors && errors.amount) &&
                          <span className="text-red-700 absolute mt-2">{errors.amount.message}</span>}
                    </div>

                    <div className="w-full mb-[40px]">
                        {categories.length > 0 ?
                            <>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium">Select an option</label>
                                <select id="countries" {...register("category")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option value="">Choose a category</option>
                                    {categories.map(({id, title}) => (
                                        <option key={id} value={id}>{title}</option>
                                    ))}
                                </select>
                                {(errors && errors.category) &&
                                  <span className="text-red-700 absolute mt-2">{errors.category.message}</span>}
                            </>
                            :
                            <>
                                <div
                                    className="flex items-center gap-[15px] cursor-pointer max-w-max"
                                    onClick={() => setVisibleCategoryCreateForm(true)}
                                >
                                    <AiOutlinePlus /> Manage Categories
                                </div>
                                <span className="text-red-700 absolute mt-2">Tou must create category</span>
                            </>
                        }
                    </div>

                    <div className="flex items-center gap-[15px] w-full mb-[30px]">
                        <div className="flex items-center">
                            <input id="default-radio-1" {...register("type")} type="radio" value="income" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium">Income</label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" {...register("type")} type="radio" value="expense" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium">Expense</label>
                        </div>
                        {(errors && errors.type) &&
                          <span className="text-red-700 absolute mt-[45px]">{errors.type.message}</span>}
                    </div>

                    <button type="submit" className="animation-click-btn text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
                </form>
            </div>
            <div className="flex min-w-[350px] h-max justify-between gap-x-[15px] p-4 rounded-xl bg-gray-900">
                <div className="space-y-2 w-full text-center">
                    <p>TOTAL INCOME:</p>
                    <div className="p-2 bg-green-600">
                        $ {totalIncome}
                    </div>
                </div>
                <div className="space-y-2 text-center w-full">
                    <p>
                        TOTAL EXPENSE:
                    </p>
                    <div className="p-2 bg-rose-900">
                        $ {totalExpense}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCreateBlock;