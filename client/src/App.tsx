import './App.scss'
import RouterBlock from "./routes/RouterBlock.tsx";
import axios from "axios";
import {useEffect} from "react";
import {useUserStore} from "./store/userStores/useUserStore.ts";

/*CSS import library*/
import 'react-toastify/dist/ReactToastify.css';
import "rc-pagination/assets/index.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
/*******************/

axios.defaults.baseURL = "http://localhost:3001/api"
const App = () => {

    const {token, handleProfile} = useUserStore(store => store);

    useEffect(() => {
        if (token) {
            handleProfile();
        }
    }, [])


    return (
        <BrowserRouter>
            <ToastContainer />
            <RouterBlock />
        </BrowserRouter>
    )
}

export default App
