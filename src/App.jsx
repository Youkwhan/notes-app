import { useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";

import { data } from "./data";

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
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  // IF notes.length; render our <Split /> panels, which includes sidebar and editor; 
  // ELSE button to create new a note;
	return (
		<main>
			{notes.length > 0 ? (
				<Split>
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="first-note" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
