import noteContext from "./NoteContext"; 
import { useState } from "react";

const NoteState=(props)=>{
  const host = "http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)

  //get all notes
  const getNotes= async ()=>{
    console.log("getting all note");

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json =  await response.json();
    console.log(json);
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    console.log("adding new note");
  
    const requestBody = {
      title: title,
      description: description,
      tag: tag,
    };
  
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Replace with your actual auth token
      },
      body: JSON.stringify(requestBody),
    });
  
    if (response.ok) {
      // If the request is successful, you can update the state with the newly added note
      const noteData = await response.json(); // Assuming the server responds with the new note data
      // props.showAlert("Note Added Successfully", 'success'); 
      // Update the state with the new note
      setNotes([...notes, noteData]);
  
      // Optionally, clear the form fields or perform other actions after a successful addition.
      // clearFormFields();
    } else {
      // Handle error cases here
      console.error("Failed to add a new note.");
    }
  };
  

  //Delete Note
  const deleteNote= async (id)=>{
    //api call to delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json =  await response.json();
    console.log(json);

    console.log("deleting note with id "+ id);
    // props.showAlert("Note Deleted Successfully", 'info'); 
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }

  //Edit note
  const editNote= async (id, title, description, tag)=>{
    //api call

   //newNotes will help to update frontend value
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;    
      }  
   
    }
    setNotes(newNotes)

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),  
    });
    // const json = response.json(); 
    // props.showAlert("Note Deleted Successfully", 'info'); 
  }

    return(
      <noteContext.Provider value={{notes,addNote,deleteNote,editNote, getNotes}}>
        {props.children}
      </noteContext.Provider>
    )
}
export default NoteState;