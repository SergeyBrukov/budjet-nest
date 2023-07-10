import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {TCategory} from "../../utils/types.ts";
import {useCategoryStore} from "../../store/categoriesStores/useCategoryStore.ts";
import {MouseEvent} from "react";

interface ICategoryCreateFormModal {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    categoryId: number,
    initialTitle: string
}

const CategoryEditFormModal = ({visible, setVisible, categoryId, initialTitle}: ICategoryCreateFormModal) => {

    const {changeCategory, loading} = useCategoryStore(store => store)

    const validateFieldCategoryCreateForm = yup.object().shape({
        title: yup.string().required("This field can not be empty").min(6, "This field must be more 5 symbol")
    })

    const {register, handleSubmit,reset, formState: {errors}} = useForm<Pick<TCategory, "title">>({
        mode: "all",
        resolver: yupResolver(validateFieldCategoryCreateForm)
    })

    const handleClickWithOutForm = (e:MouseEvent) => {
        //@ts-ignore
        if(!e.target.closest("#form")) {
            setVisible(false);
            reset();
        }
    }

    const handleSubmitCreateCategory:SubmitHandler<Pick<TCategory, "title">> = (data) => {
        changeCategory(data.title, categoryId).then(response => {
            if(response === 200) {
                setVisible(false);
                reset();
            }
        })
    }

    return (
        <div className={`${visible ? "flex" : "hidden"} absolute justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-90 z-10 w-full h-full`} onClick={handleClickWithOutForm}>
            <form id="form" onSubmit={handleSubmit(handleSubmitCreateCategory)} className="w-full max-w-[300px] p-10 border-white border-2 rounded-xl">
                <label className="block mb-[40px] text-sm font-medium relative dark:text-white">Title
                    <input {...register("title", {
                        value: initialTitle
                    })} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    {(errors && errors.title) && <span className="text-red-700 absolute top-[65px]">{errors.title.message}</span>}
                </label>

                <button type="submit" disabled={loading} className="mx-auto block animation-click-btn text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
            </form>
        </div>
    )
}

export default CategoryEditFormModal