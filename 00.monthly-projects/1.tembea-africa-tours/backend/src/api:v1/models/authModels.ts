import {Request} from 'express'

export interface User{
    id:string,
    u_name:string,
    u_email:string,
    u_password:string,
    isEmailSent?:number, //set property to optional
    isDeleted?:number,  //set property to optional
    bookingsMade?:number
}

export interface UserPayload{
    id: string,
    name: string,
    email:string
}

export interface ExtendedRequest extends Request{
    info?: UserPayload
}