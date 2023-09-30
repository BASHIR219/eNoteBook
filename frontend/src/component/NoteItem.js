import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (

        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body" style={{
                    border: '2px solid aqua', color: 'white', backgroundColor: "#310e68",
                    backgroundImage: "linear-gradient(316deg, #009FC2 0%, #0D0A0B 74%)", minHeight: '250px', Width: '100px',
                    borderRadius:'5px',
                    boxShadow:'6px 6px 6px rgba(0, 255, 255, 0.3)',
                }}>
                    <h5 className="card-title p-1" style={{ border: '1px solid aqua',borderRadius:'5px',backgroundColor:'black' }} >{note.title}</h5>
                    <p className="card-text p-1" style={{ border: '1px solid aqua',borderRadius:'5px',backgroundColor:'black', minHeight:'150px', }}> {note.description}</p>
                    <i
                        className="fa-solid fa-trash mx-5 my-3 position-absolute bottom-0"
                        onClick={() => {
                            deleteNote(note._id);
                            showAlert("Deleted Successfully", "info");
                        }}
                    ></i>
                    <i className="fa-solid fa-pen-to-square  my-3 position-absolute bottom-0" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>

    )
}
