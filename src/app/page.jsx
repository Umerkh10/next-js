"use client"
import axios from 'axios'
import { Suspense, useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'


const Todos = () => {
const[inputText,setInputText] = useState("");
const [todos,setTodos]= useState(null)
const [editMode,setEditMode] = useState(false);
const [editTodoInfo,setEditTodoInfo]= useState({
  id:"",
  desc:"",
  completed:"",
});

axios.defaults.baseURL = "http://localhost:3000"

const fetchData = async () => {
  const res = await fetch("/api/todos",{cache:"no-cache"})
  const data = await res.json()
  setTodos(data.todos);
} 

useEffect(()=>{

  fetchData()
},[todos]);

async function addTodos(){
  axios.post("/api/todos",{desc:inputText}).then(resp=>{
    console.log(resp)
  })
  setInputText("")
  toast.success("item added sucessfully")
  
}

async function clearTodos(){
  setInputText("")
}

async function deleteTodo(todo){
  const id = todo.id

  const resp = await axios.delete(`/api/todos/${id}`);
  console.log(resp.data);
 
  toast.info("item deleted sucessfully ")
  fetchData()
  
}

async function editTodo(todo){
  setEditMode(true);
  setEditTodoInfo({
    id:todo.id,
    desc:todo.desc,
    completed:todo.completed,
  })
}

async function updateTodo(){
  const data ={
    desc: editTodoInfo.desc,
    completed:editTodoInfo.completed,

  }
  console.log(data);
  const resp = await axios.put(`/api/todos/${editTodoInfo.id}`,data);
  console.log(resp);
  setEditMode(false);

  toast.success("Item edited sucessfully")
 fetchData()
}


if (editMode){

  return(

    <div className="flex flex-col items-center gap-8 pt-5 bg-violet-200 pb-32">
      <div className="text-2xl">Edit Todo</div>
      <div className="flex gap-4">
        <div className="text-2xl"> Edit desc:</div>
        <input className='rounded-md shadow-md text-lg outline-none px-3' type="text" placeholder='Enter new desc' value={editTodoInfo.desc}
        onChange={(e)=> setEditTodoInfo({...editTodoInfo,desc: e.target.value})} />
      <button onClick={updateTodo} className='text-xl shadow-md bg-green-500 rounded-md text-white hover:bg-green-700 transition duration-300 px-3 py-1'>Submit</button>
      </div>
      <div className="flex gap-4">
        <div className="text-lg hidden">Edit Completed</div>
        <input type="checkbox" className='hidden' checked={editTodoInfo.completed} onChange={(e)=>setEditTodoInfo({...editTodoInfo,completed:!editTodoInfo.completed})} />
      </div>
    </div>
    // <EditForm state={editTodoInfo} />

  );

}

  return (
    <div className='flex flex-col items-center gap-8 pt-5 bg-violet-200 pb-32 '>
      <div className="text-2xl font-medium ">Todo List</div>
      <div className=" flex gap-2">
        <input required className='text-lg rounded-md shadow-md outline-none px-2' type="text" placeholder='Enter Todo' value={inputText} onChange={(e)=>setInputText(e.target.value)} />
        <button onClick={addTodos} className='text-xl shadow-md bg-blue-400 rounded-md text-white hover:bg-blue-700 transition duration-300 px-3 py-1 '>Add</button>
        <button onClick={clearTodos} className='text-xl shadow-md bg-green-500 rounded-md text-white hover:bg-green-700 transition duration-300 px-3 py-1 '>Clear</button>
      </div>

      {/* <Suspense fallback={<Loading/>}> */}
      <div className='w-5/6 flex flex-col gap-2'>
        {todos ===null && <div className='text-center text-2xl font-serif py-5 font-medium animate-pulse '>Loading...</div>}
        { todos?.map((todo,index)=>
        {
          return(
            <div key={index} className='bg-violet-500 flex justify-between items-center p-2 rounded-md'>
              <div className='flex gap-2'>
                <input type="checkbox" className='hidden' checked={todo.completed} />
                <div className='text-white capitalize'>{todo.desc}</div>
              </div>
              <div className='flex gap-2'>
                
                <button onClick={() => editTodo(todo)} className='text-xl shadow-md bg-green-500 rounded-md text-white hover:bg-green-700 transition duration-300 px-3 py-1'>Edit</button>
                <button onClick={()=> deleteTodo(todo)} className='text-xl shadow-md bg-red-500 rounded-md text-white hover:bg-red-700 transition duration-300 px-3 py-1'>Delete</button>

              </div>
            </div>
            
          )
        }
        )}

      </div>
      {/* </Suspense> */}
    </div>
  )
}

export default Todos


function Loading(){
  return <div>Loading...</div>
}