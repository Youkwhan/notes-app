import { useState, useEffect } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import { onSnapshot, addDoc } from "firebase/firestore";

import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./App.css";
import { notesCollection } from "./config/firebase";

export default function App() {
	// notes: object holding all our {notes id: body}
	// currentNodeId: initalize current as first item in notes OR ""
	const [notes, setNotes] = useState([]);
	//notes[0]?.id === (notes[0] && notes[0].id)
	const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");

	// Every time we re-render, we find the selected note object
	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
			// Sync up our local notes array with the snapshot data
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setNotes(notesArr);
		});
		// when component unmount, clean up and close listener
		return unsubscribe;
	}, []);

	// void; creates newNote object.
	// Add newNote to beginning of notes state... thus, update currentNoteId as newNode.id
	async function createNewNote() {
		const newNote = {
			// id: nanoid(), Firestore will create it's own id
			body: "# Type your markdown note's title here",
		};
		const newNoteRef = await addDoc(notesCollection, newNote)
		setCurrentNoteId(newNoteRef.id);
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

	function deleteNote(event, noteId) {
		// stop the click event from propagating up to the parent
		// since parent also has it's own click event (selector, but if element is gone from DOM the parent click event will have error).
		event.stopPropagation();
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

	// IF notes.length; render our <Split /> panels, which includes sidebar and editor;
	// ELSE button to create new a note;
	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={currentNote} updateNote={updateNote} />
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
