import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

function Noteitem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note, updateNote} = props;
  return (
    <div className='col-md-4 my-2 py-3'>

                <div className="card bg-primary text-white shadow-lg border-primary">
                <div className="card-body">
                  <div className='d-flex align-items-center align-self-center mx-2 '>
                <h5 className="card-title mx-2 ">{note.title}</h5>

                <i className="fa-solid fa-trash mx-2" onClick={() =>{deleteNote(note._id); 
               props.showAlert("Deleted successfully", "success")   }}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
                </div>
                <p className="card-text font-italic"> {note.description}</p>
            
            </div>
            </div>
    </div>
  )
}

export default Noteitem