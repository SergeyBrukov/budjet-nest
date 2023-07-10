export interface IUser {
    token: string | null
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRegister extends IUserLogin {
    userName: string
}

export interface ICreateTransaction {
    title: string,
    amount: number,
    type: string,
    category: string
}