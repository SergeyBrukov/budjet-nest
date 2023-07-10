import {SubmitHandler, useForm} from "react-hook-form";
import {IUserLogin} from "../utils/inteface.ts";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useUserStore} from "../store/userStores/useUserStore.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate()

    const examinationLoginFields = yup.object({
        email: yup.string().required("This field can not be empty").email("This field must be email"),
        password: yup.string().required("This field can not be empty").min(6, "This field must be more 5 symbol")
    })

    const {handleLogin} = useUserStore(store => store)

    const {handleSubmit, register, formState: {errors, isValid}} = useForm<IUserLogin>({
        mode: "all",
        resolver: yupResolver(examinationLoginFields)
    })

    const handleLoginSubmitForm: SubmitHandler<IUserLogin> = (data) => {
        handleLogin(data).then(status => {
            if(status === 201) {
                navigate("/")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(handleLoginSubmitForm)} className="flex items-center flex-col max-w-[600px] mx-auto p-10 mt-20 bg-gray-900 border-gray-200 rounded-[15px]">
            <div className="mb-10 w-full relative">
                <label htmlFor="email" className="block mb-2 text-sm font-medium  dark:text-white">Email address</label>
                <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
                {(errors && errors.email) && <span className="text-red-700 absolute mt-2">{errors.email.message}</span>}
            </div>
            <div className="mb-10 w-full relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">Password</label>
                <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
                {(errors && errors.password) &&
                  <span className="text-red-700 absolute mt-2">{errors.password.message}</span>}
            </div>
            <button disabled={!isValid} type="submit" className="animation-click-btn text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
        </form>
    )
}

export default LoginPage;