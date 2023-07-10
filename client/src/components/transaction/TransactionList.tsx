import {useTransactionFilter, useTransactionStore} from "../../store/transactionStores/useTransactionStore.ts";
import Pagination from 'rc-pagination';
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";
import TransactionItem from "./TransactionItem.tsx";
import DelayInput from "../elements/delayInput/DelayInput.tsx";

const TransactionList = () => {

    const didMount = useRef<boolean>(true);

    const [searchParams, setSearchPrams] = useSearchParams();
    const parasQueryString = Object.fromEntries(new URLSearchParams(searchParams));

    const {fetchTransaction, transactions, totalAmount, deleteTransaction} = useTransactionStore(store => store);

    const {pagination, handleChangePage} = useTransactionFilter(store => store)

    const handleMountComponent = () => {

        if (parasQueryString.page && parasQueryString.page !== String(pagination.page)) {
            handleChangePage(Number(parasQueryString.page))
        } else if (!parasQueryString.page) {
            setSearchPrams(prev => ({...prev, page: String(pagination.page)}), {replace: true})
        }
    }

    const handleChangePageWithSearch = (page: number) => {
        setSearchPrams(prev => ({...prev, page: String(page)}))
        handleChangePage(page);
    }

    const handleSearchTransaction = useCallback((value: string) => {
        if (value === "") {
            setSearchPrams(prev => {
                let newSearchParams = Object.fromEntries(prev.entries());
                delete newSearchParams.search

                return newSearchParams
            });
            return
        }
        setSearchPrams(prev => ({
            ...Object.fromEntries(prev.entries()),
            search: value
        }));
    }, [])

    useEffect(() => {
        fetchTransaction({...pagination, page: Number(parasQueryString.page) || pagination.page,  search: parasQueryString.search || ""});
        handleMountComponent();
    }, [])


    useEffect(() => {
        if (didMount.current) {
            didMount.current = false
            return
        }

        fetchTransaction({...pagination, page: Number(parasQueryString.page), search: parasQueryString.search || ""});

    }, [searchParams])


    return (
        <div className="">
            <DelayInput defaultValue={parasQueryString.search || ""} onChange={handleSearchTransaction} className="mt-4" placeholder="Search transaction by title" />

            {!transactions || transactions.length === 0 &&
              <div className="flex items-center p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Info alert!</span> You have not any transaction.
                </div>
              </div>}

            <div className="relative overflow-x-auto mt-4 rounded-xl">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-white">
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Create At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    {transactions.map((transaction) => (
                        <tbody className="bg-gray-900 text-white" key={transaction.id}>
                        <TransactionItem transaction={transaction} deleteTransaction={deleteTransaction}/>
                        </tbody>
                    ))}
                </table>
            </div>
            <Pagination className="ant-pagination flex justify-center mt-4" onChange={handleChangePageWithSearch} current={pagination.page} total={totalAmount} />
        </div>
    )
}

export default TransactionList