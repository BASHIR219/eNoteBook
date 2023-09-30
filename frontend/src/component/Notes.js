import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context || { notes: [] }; // Provide a default empty array if context is undefined
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });
    let navigate = useNavigate();
    useEffect(() => {
        //if user is not login then send to login page before accessing note
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log("updating the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", 'success');

    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content" style={{
                    border: '3px solid aqua', color: 'white', backgroundColor: "#310e68",
                    backgroundImage: "linear-gradient(316deg, #009FC2 0%, #0D0A0B 74%)", minHeight: '250px', Width: '100px',
                    borderRadius:'5px',
                    boxShadow:'5px 5px 5px rgba(0, 255, 255, 0.2)',
                }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={onChange}
                                        minLength={5} required
                                        style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                        minLength={5} required
                                        style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        onChange={onChange}
                                        value={note.etag}
                                        style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription.length < 5 || note.etitle.length < 5} type="button" onClick={handleClick} className="btn" style={{backgroundColor:'aqua', color:'black'}}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-4" style={{color:'white'}}>
                <h2>Your Notes</h2>
                <div className='row'>
                    {notes.length > 0 ? (
                        notes.map((note) => {
                            return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                        })
                    ) : (
                        <p>No notes to display.</p>
                    )}
                </div>
            </div>
        </>
    );
}      