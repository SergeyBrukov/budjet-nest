import {guestRouters, userRouters} from "../../routes/routersWay.ts";

export const useRoutersHook = (token: boolean) => {

    if(token) {
        return userRouters
    }

    return guestRouters
}