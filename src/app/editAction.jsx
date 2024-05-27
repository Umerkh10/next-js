"use server"

import React from 'react'
import Todo from './models/todo';
import { todo } from 'node:test';
import { redirect } from 'next/navigation';

async function editAction(state,formData) {
 try {

    const id = formData.get("id")
    const desc = formData.get("desc")
    const completed = formData.get("completed")
    await Todo.updateOne({id,desc,completed})
    

 } catch (error) {
    console.log(error);
 }
}

export default editAction