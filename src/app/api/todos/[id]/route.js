import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import {connect} from '../../../dbConfig/db'
import Todo from '../../../models/todo'
import { v4 } from 'uuid';
import { revalidatePath } from "next/cache";

connect()

export async function GET(request){
    try{
        const url =request.url
        const split = url.split("/")
        const id = split[split.length - 1]
        console.log(id);
        const todo= await Todo.findOne({id})


        return NextResponse.json({msg:"Found all todos",success:true,todo})

    } catch(error){
    console.log(error);
        return NextResponse.json({msg:"issue happend!"},{status:500})
    }
}

export async function DELETE(request){
    try {
        const url =request.url
        const split = url.split("/")
        const id = split[split.length - 1]

        await Todo.deleteOne({id});
        return NextResponse.json({msg:"Todo Deleted",sucess:true})

    } catch (error) {
        console.log(object);
    }
}

export async function PUT(request){
    try {

        const url =request.url
        const split = url.split("/")
        const id = split[split.length - 1]

        const reqBody = await request.json()
        const {desc,completed} = reqBody
        console.log(desc);
        
         await Todo.updateOne({id},{$set: {desc,completed}})
    revalidatePath("./app/page.jsx","layout")

        return NextResponse.json({msg:"todo Edited", success:true})

    } catch (error) {
        return NextResponse.json({msg:"issue happend!"},{status:500})

    }
}