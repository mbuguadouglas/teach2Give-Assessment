import {Request, Response } from 'express'
import {v4 as uid} from 'uuid' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'

import { DbHelper } from '../databaseHelpers'
import { registerSchema } from '../validation/authValidation'
import { Roles, User, UserPayload } from '../models/authModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


// initialize the database helpers
const dbInstance = new DbHelper()

export async function registerUser(request:Request,response:Response) {
    const id = uid()
    const role = Roles.User     //change when you need to add admin
    const {u_name,u_email,u_password} = request.body

    const { error } = registerSchema.validate(request.body)
    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {
            const hashedPassword = await bcrypt.hash(u_password,9)    //salt MUST be below 10 to save on time
            
            await dbInstance.exec('addUser',{
                id: id,
                u_name:u_name,
                u_email: u_email,
                u_password:hashedPassword,
                role:role   //hard coded to an admin to create an admin user. then change to normal
            })

            const payload:UserPayload = {
                id: id,
                name: u_name,
                email: u_email,
                role: role
            }

            // const token = jwt.sign(payload,process.env.SECRET as string,{expiresIn:'20d'})

            return response.status(200).send({message:"New User added succesfully!"})
            // return response.status(200).send({message:"New User added succesfully!",token})
        }

    } catch(error){
        response.status(400).send(error)
    }
}


// function for login
export async function loginUser (request:Request<{id:string}>, response:Response){
    try{
        const {u_email,u_password} = request.body
        const user = (await dbInstance.exec('getUserByEmail',{
            u_email:u_email
        })).recordset as Array<User>    // used User Array gets all
        // console.log(user.id)
        // console.log(user.u_password)
        // console.log(u_password)

        // user validation
        if(user){
            // this had too much nesting. decided to use an array instaed
            
            const isValid = await bcrypt.compare(u_password,user[0].u_password)
            
            if(isValid){
                // to be passed to the token.
                const payload:UserPayload = {
                    id: user[0].id,
                    name: user[0].u_name,
                    email:user[0].u_email,
                    role: user[0].role
                }
                // console.log(payload)

                const token = jwt.sign(payload,process.env.SECRET as string,{expiresIn:'20d'})
                const decodedToken = jwt.verify(token, process.env.SECRET as string) as UserPayload
                // console.log(token)
                

                // return response.status(200).send({message:"login successful!"})
                // return response.status(200).send({message:"login successful!",token, role:user[0].role})
                return response.status(200).send({message:"login successful!",token:token,decodedToken:decodedToken})
            } else{
            return response.status(400).send({message:"invalid login credentials.try again?"})
        }
        }
    } catch(error){
        response.status(400).send(error)
    }
} 



export async function getUsers (request:Request,response:Response){
    try{
        const users = (await dbInstance.get('getUsers')).recordset as Array<User>

        response.status(200).send(users)

    } catch(error) {
        response.status(500).send(error)
    }

}


export async function getUser (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const user = (await dbInstance.exec('getUser',{
            id:id
        })).recordset[0] as Array<User>
        // console.log(user)

        if (user ){
            response.status(200).send(user)

        } else {
            response.status(200).send({message:"User not found. review the id and try again?"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}


export async function updateUser  (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const role = Roles.User     //change if admin needs to update themselves
        // console.log(id)
        const user = (await dbInstance.exec('getUser',{
            id:id
        })).recordset[0] as Array<User>


        if (user){
            const {u_name,u_email,u_password} = request.body
            dbInstance.exec('updateUser',{
                id: id,
                u_name: u_name,
                u_email:u_email,
                u_password:u_password,
                role:role
            })

            response.status(200).send({message:"Existing user updated succesfully!"})

        } else {
            response.status(200).send({message:"User not found. review the id and try again?"})
        }


    } catch(error) {
        response.status(500).send(error)
    }}



export async function deleteUser (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const user = (await dbInstance.exec('getUser',{
            id:id
        })).recordset[0] as Array<User>
        
        if (user){
            await dbInstance.exec('deleteUser',{
                id:id
            })

            response.status(200).send({message:"user deleted succesfully!"})
            
        } else {
            response.status(200).send({message:"User not found. review the id and try again?"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}


