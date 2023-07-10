import { Route, Routes, Navigate} from "react-router-dom";
import Layout from "../components/layout/Layout.tsx";
import {useRoutersHook} from "../customHook/routerHook/routersHook.tsx";
import SuspenseWrapper from "./SuspenseWrapper.tsx";
import {useUserStore} from "../store/userStores/useUserStore.ts";

const RouterBlock = () => {

    const token = useUserStore(store => store.token);

    const routers = useRoutersHook(!!token);

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {!token && <Route path="*" element={<Navigate to="/login"/>}/>}
                {routers.map(({path, element}) => (
                    <Route key={path} path={path} element={<SuspenseWrapper path={element}/>}/>
                ))}
            </Route>
            <Route path="*" element={<SuspenseWrapper path="PageNotFound"/>}/>
        </Routes>
    )

}

export default RouterBlock;