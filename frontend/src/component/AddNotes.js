import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

export default function AddNotes(props) {
    const { addNote } = useContext(noteContext);

    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // Optionally, you can clear the input fields after adding the note.
        setNote({ title: '', description: '', tag: '' });
        props.showAlert("Note Added Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container pt-5" style={{ color:'white'}}>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        minLength={5} required
                        style={{backgroundColor:'black', color:'white', border:'1px solid aqua'}}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
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
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        style={{backgroundColor:'black', color:'white',border:'1px solid aqua'}}
                    />
                </div>
                <button type="submit" disabled={note.description.length<5 || note.title.length<5} className="btn btn-info" onClick={handleClick}>
                    Add Note
                </button>

            </form>
        </div>
    );
}
