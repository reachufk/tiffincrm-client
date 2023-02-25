
export interface IUser {
    username: String
    phoneNumber: String
    email: String
    password: String
}

export interface IOTP {
    otp: String
    phoneNumber: String
}

export interface IloggedUser{
    username:String,
    phoneNumber:Number,
    email?:String,
    token:String
}