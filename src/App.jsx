import { useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";

// import { data } from "./data.js";
import Sidebar from "./components/Sidebar";
// import Editor from "./components/Editor";
import "./App.css";

export default function App() {
	// notes: object holding all our {notes id: body}
	// currentNodeId: initalize current as first item in notes OR ""
	const [notes, setNotes] = useState([]);
	const [currentNoteId, setCurrentNoteId] = useState(
		(notes[0] && notes[0].id) || ""
	);

	// void; creates newNote object.
	// Add newNote to beginning of notes state... thus, update currentNoteId as newNode.id
	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "# Type your markdown note's title here",
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

  // return note obj; If note obj doesnt exist inside notes, return the 1st note by default
  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

	// IF notes.length; render our <Split /> panels, which includes sidebar and editor;
	// ELSE button to create new a note;
	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
					/>
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="no-notes-btn" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
