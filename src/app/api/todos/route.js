import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '../../dbConfig/db'
import Todo from '../../models/todo'
import { v4 } from 'uuid';
import { revalidatePath } from "next/cache";

connect()

export async function GET() {
    try {
        const todos = await Todo.find({})
        console.log(todos);

        return NextResponse.json({ msg: "Found all todos", success: true, todos })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "issue happend!" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { desc } = reqBody
        console.log(desc);

        const newTodo = new Todo({
            id: v4(),
            desc,
            completed: false
        })

        const savedTodo = await newTodo.save()
        revalidatePath("/","layout")
        return NextResponse.json({ msg: "todo added", success: true, savedTodo })

    } catch (error) {
        return NextResponse.json({ msg: "issue happend!" }, { status: 500 })

    }
}