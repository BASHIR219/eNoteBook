// import React, { useContext } from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes'

export default function Home(props) {
  // const {showAlert} = props;
 
  return (
    <div style={{
      backgroundColor: "#36096d",
      backgroundImage: "linear-gradient(315deg, #0D0A0B 0%, #102533 74%)",
      backgroundSize:'cover',
      minHeight: '100vh',
    }}>
    <AddNotes showAlert={props.showAlert}/>
    <Notes showAlert={props.showAlert} />
    </div>
  )
}
