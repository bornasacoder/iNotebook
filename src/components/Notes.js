import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
      getNotes()
      }else{
        navigate("/login");
      }
       // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "",  etitle:"", edescription:"",etag:"default"})


    const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})

    }
    const handleClick = (e)=>{
      console.log("updating the note...", note);
      e.preventDefault();
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
    props.showAlert("Updated Successfully", "success");




  }
  const onChange = (e) =>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
    {/*Edit  modals */}
    {/* <!-- Button trigger modal --> */}
<button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Edit Note
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className='my-3'>

          <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group">
              <label htmlFor="edesc">Description</label>
              <input type="text" className="form-control" id="edesc" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group">
              <label htmlFor="etag">Tag</label>
              <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} />
          </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


     <h2>Your Notes</h2>
    <div className='row my-3'>
      <div className='container'>
      {notes.length===0 && 'No notes to display'}
      </div>
    {notes.map((note)=>{
        return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
    })}
    </div>
    </>
  )
}

export default Notes