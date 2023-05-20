import { useState, useEffect } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";

// import { data } from "./data.js";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./App.css";

export default function App() {
	// notes: object holding all our {notes id: body}
	// currentNodeId: initalize current as first item in notes OR ""
	const [notes, setNotes] = useState(
		() => JSON.parse(localStorage.getItem("notes")) || []
	);
	const [currentNoteId, setCurrentNoteId] = useState(
		(notes[0] && notes[0].id) || ""
	);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

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
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	// void, update the current note.body's text
	function updateNote(text) {
		// Put the most recently-modified note at the top
		setNotes((prevNotes) => {
			const newArray = [];
			for (let i = 0; i < prevNotes.length; i++) {
				const prevNote = prevNotes[i];
				if (prevNote.id === currentNoteId) {
					newArray.unshift({ ...prevNote, body: text });
				} else {
					newArray.push(prevNote);
				}
			}
			return newArray;
		});
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
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
					)}
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
