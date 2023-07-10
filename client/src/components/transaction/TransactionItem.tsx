import {TTransaction} from "../../utils/types.ts";
import {TransactionType} from "../../utils/enum.ts";
import {MdDeleteForever} from "react-icons/md";

interface ITransactionItem {
    transaction: TTransaction,
    deleteTransaction: (id: number) => void
}

const TransactionItem = ({transaction, deleteTransaction}: ITransactionItem) => {

    const {id, type, amount, createAt, title} = transaction;

    const isoDate = new Date(createAt);
    const formattedDate = `${isoDate.getDate().toString().padStart(2, '0')}-${(isoDate.getMonth() + 1).toString().padStart(2, '0')}-${isoDate.getFullYear()}`;

    const examinationExpenseTypeTransaction = type === TransactionType.EXPENSE;

    return (
        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-6 py-4">
                {title}
            </td>
            <td className={`px-6 py-4 ${examinationExpenseTypeTransaction ? "text-red-700": "text-green-700"}`}>
                {type}
            </td>
            <td className={`px-6 py-4 ${ examinationExpenseTypeTransaction ? "text-red-700": "text-green-700"}`}>
                {examinationExpenseTypeTransaction ? "-" : "+"} {amount} $
            </td>
            <td className="px-6 py-4">
                {formattedDate}
            </td>
            <td className="px-6 py-4">
                <MdDeleteForever size="25" className="text-red-500 cursor-pointer" onClick={() => deleteTransaction(id)}/>
            </td>
        </tr>
    )
}

export default TransactionItem