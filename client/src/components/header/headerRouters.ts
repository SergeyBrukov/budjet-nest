import {TNavRouters} from "../../utils/types.ts";

const guestNavRouters:TNavRouters[] = [];

const userNavRouters: TNavRouters[] = [
    {name: "Home", path: "/"},
    {name: "Transactions", path: "/transactions"},
    {name: "Categories", path: "/categories"},
]

export {guestNavRouters, userNavRouters}