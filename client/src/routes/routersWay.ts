import {TRouter} from "../utils/types.ts";

const guestRouters:TRouter[] = [
    {path: "/", element: "HomePage"},
    {path: "/login", element: "LoginPage"},
    {path: "/register", element: "RegisterPage"},
];

const userRouters: TRouter[] = [
    {path: "/", element:"HomePage"},
    {path: "/categories", element:"CategoriesPage"},
    {path: "/categories-create", element:"CategoriesCreatePage"},
    {path: "/transactions", element:"TransactionsPage"},
]


export {guestRouters, userRouters}