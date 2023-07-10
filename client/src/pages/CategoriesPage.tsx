import {useCategoryStore} from "../store/categoriesStores/useCategoryStore.ts";
import {useEffect, useState} from "react";
import CategoryCreateFormModal from "../components/category/CategoryCreateFormModal.tsx";
import {AiOutlinePlus} from "react-icons/ai";
import CategoryItem from "../components/category/CategoryItem.tsx";

const CategoriesPage = () => {
    const [visibleCategoryCreateForm, setVisibleCategoryCreateForm] = useState(false);

    const {categories, deleteCategory, fetchCategory} = useCategoryStore(store => store)

    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <div className="p-5 rounded-xl bg-gray-900 w-full">
            <CategoryCreateFormModal visible={visibleCategoryCreateForm} setVisible={setVisibleCategoryCreateForm} />
            <div className="flex gap-5 flex-wrap">
                {categories.length > 0 &&
                    categories.map(category => (
                        <CategoryItem category={category} deleteCategory={deleteCategory} key={category.id} />
                    ))
                }
            </div>
            <div
                className="flex mt-[15px] items-center gap-[15px] cursor-pointer max-w-max"
                onClick={() => setVisibleCategoryCreateForm(true)}
            >
                <AiOutlinePlus /> Manage Categories
            </div>
        </div>
    )
}

export default CategoriesPage;