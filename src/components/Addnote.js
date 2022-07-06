import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title:"", description:"",tag:"" })
    props.showAlert("Added Successfully", "success");

    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (

<div className='container my-3 py-3 '>
    <h2>Add Note</h2>
    <form className='my-3'>

        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input type="text" className="form-control" id="desc" name='description' value={note.description} onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} minLength={5}  />
        </div>
       
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>

</div>
  )
}

export default Addnote