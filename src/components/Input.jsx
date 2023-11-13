import React, {useState} from "react";
import Note from "./Note";
import AddIcon from "@material-ui/icons/Add";

function Input() {

    const [input, setInput] = useState({title: "", content: ""});
    const [notes, setNotes] = useState([]);

    function changeInput(event) {
        const newValue = event.target.value;
        const inputName = event.target.name;
        setInput(prevValue => {
            if (inputName === "title") {
                return {title: newValue, content: prevValue.content}
            }
            else if (inputName === "content") {
                return {title: prevValue.title, content: newValue}
            }
        });
    }

    function addNote(event) {
        setNotes(prevItems => {return [...prevItems, input];})
        event.preventDefault();
    }

    function deleteNote(id) {
        setNotes(prevItems => {return prevItems.filter((item, index) => {return index !== id;})})
    }

  return (
    <div>
      <form onSubmit={addNote}>
        <input onChange={changeInput} name="title" placeholder="Title" />
        <textarea onChange={changeInput} name="content" placeholder="Take a note..." rows="3" />
        <button type="submit"><AddIcon /></button>
      </form>
      {notes.map((note, index) => <Note key={index} title={note.title} content={note.content} 
      onChecked={() => deleteNote(index)}/>)}
    </div>
  );
}

export default Input;
