import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {TCategory} from "../../utils/types.ts";
import {useState} from "react";
import CategoryEditFormModal from "./CategoryEditFormModal.tsx";

interface ICategoryItem {
    category: TCategory,
    deleteCategory: (id: number) => void
}

const CategoryItem = ({category, deleteCategory}:ICategoryItem) => {
    const [hoverVisible, setHoverVisible] = useState<boolean>(false);
    const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);

    const {id, title} = category;

    return (
        <div>
            <CategoryEditFormModal categoryId={id} setVisible={setVisibleEditModal} visible={visibleEditModal} initialTitle={title}/>
            <div key={id} onMouseEnter={() => setHoverVisible(true)} onMouseLeave={() => setHoverVisible(false)} className="p-3 relative bg-blue-800 rounded-xl text-center max-w-max">
                {title}
                <div className={`${hoverVisible ? "flex" : "hidden"} absolute flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 bg-gray-900 bg-opacity-50 w-full h-full`}>
                    <AiFillEdit size="20" className="cursor-pointer" onClick={() => setVisibleEditModal(true)} />
                    <MdDeleteForever size="20" className="cursor-pointer" onClick={() => deleteCategory(id)}/>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem