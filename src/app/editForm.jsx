import React from 'react'
import editAction from './editAction'
import { useFormState } from "react-dom";


function EditForm({state}) {
    console.log(state);
    const [prestate, action] = useFormState(editAction,null)
  return (
    <form action={action} className="flex flex-col items-center gap-8 pt-5 bg-violet-200 pb-32">
    <div className="text-2xl">Edit Todo</div>
    <div className="flex gap-4">
      <div className="text-2xl"> Edit desc:</div>
      <input type="text" name='id' value={state.id} className='hidden'/>
      <input name='desc' className='rounded-md shadow-md text-lg outline-none px-3' type="text" placeholder='Enter new desc' defaultValue={state.desc}
       />
    </div>
    <div className="flex gap-4">
      <div className="text-lg">Edit Completed</div>
      {/* <input type="checkbox" checked={editTodoInfo.completed} onChange={(e)=>setEditTodoInfo({...editTodoInfo,completed:!editTodoInfo.completed})} /> */}
      <input  value={state.completed} name='complete' className=''  type="checkbox" checked={state.completed}/>
    </div>
    <button type="submit" className='text-xl shadow-md bg-green-500 rounded-md text-white hover:bg-green-700 transition duration-300 px-3 py-1'>Submit</button>
  </form>
  )
}

export default EditForm