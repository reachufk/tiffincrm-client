
export interface IUser {
    user:String
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
    user:String
    username:String,
    phoneNumber:Number,
    email?:String,
    token:String
}