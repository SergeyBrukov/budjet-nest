import {useUserStore} from "../store/userStores/useUserStore.ts";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const {userName, token} = useUserStore(store => store);

    const navigate = useNavigate();

    return (
        <div className="flex min-h-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center m-auto max-w-sm p-6 border border-white rounded-lg">
            {token ?
                <div className="flex flex-col items-center font-bold min-w-[300px]">
                    <p className="text-lg">
                        Hello, <span className="text-blue-600">{userName}</span>
                    </p>
                    <div>
                        <button onClick={() => navigate("/transactions")} className="btn btn-green mt-5">Keep track your money</button>
                    </div>
                </div>
                :
                <p>
                    You must
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>login</span>
                    or
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>register</span>
                </p>
            }
        </div>
    )
}

export default HomePage;