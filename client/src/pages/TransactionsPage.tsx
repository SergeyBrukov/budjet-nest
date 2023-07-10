import TransactionCreateBlock from "../components/transaction/TransactionCreateBlock.tsx";
import TransactionList from "../components/transaction/TransactionList.tsx";


const TransactionsPage = () => {


    return (
        <div>
            <TransactionCreateBlock />
            <TransactionList/>
        </div>
    )
}

export default TransactionsPage;