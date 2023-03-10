
export interface IUser {
    user: String
    username: String
    phoneNumber: String
    email: String
    password: String
    otp: String
}

export interface IOTP {
    otp: String
    phoneNumber: String
}

export interface IloggedUser {
    user: String
    username: String,
    phoneNumber: Number,
    email: String,
    role: String
    token: String
}