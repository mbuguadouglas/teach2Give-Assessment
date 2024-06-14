import {Request,Response} from 'express'
import {v4 as uid} from 'uuid'
import mssql from 'mssql'
import {sqlConfig} from '../config'
import { Category,CategoryRequest } from '../models/categoriesModels'


export async function addCategory (request:CategoryRequest,response:Response){
    try{
        const id = uid()
        const {name} = request.body
        const pool = await mssql.connect(sqlConfig)

        await pool.request()
        .input('id',id)
        .input('c_name',name)
        .execute('addCategory')

        response.status(200).send({message:"category added succesfully!"})

    } catch(error) {
        response.status(500).send(error)
    }

}



export async function getCategories  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const categories = (await pool.request().execute('getCategories'))
        .recordset as Array<Category>

        response.status(200).send(categories)

    } catch(error) {
        response.status(500).send(error)
    }

}


export async function getCategory  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        // console.log(id)
        const category = (await pool.request().input("id",id).execute('getCategory'))//.recordset
        .recordset[0] as Array<Category>

        if (category ){
            response.status(200).send(category)

        } else {
            response.status(200).send({message:"product not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}



// export async function deleteCategory  (request:Request<{id:string}>,response:Response){
//     try{
//         const pool = await mssql.connect(sqlConfig)
//         const id = request.params.id
//         // console.log(id)
//         const category = (await pool.request().input("id",id).execute('deleteCategory'))//.recordset
//         // .recordset[0] as Array<Product>  -> was the purpose of recordset?!?!

//         if (category){
//             await pool.request()
//             .input('id',id)
//             .execute('deleteCategory')

//             response.status(200).send({message:"category deleted succesfully!"})

//         } else {
//             response.status(200).send({message:"category not found"})
//         }


//     } catch(error) {
//         response.status(500).send(error)
//     }
// }

