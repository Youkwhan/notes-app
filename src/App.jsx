import { useState, useEffect } from "react";
import Split from "react-split";
// import { nanoid } from "nanoid";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./App.css";
import { notesCollection, db } from "./config/firebase";

export default function App() {
	// notes: object holding all our {notes id: body}
	// currentNodeId: initalize current as first item in notes OR ""
	const [notes, setNotes] = useState([]);
	//notes[0]?.id === (notes[0] && notes[0].id)
	const [currentNoteId, setCurrentNoteId] = useState("");

	// Every time we re-render, we find the selected note object. Logic to see if we have items or not and render "Create New Note" menu
	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	// Sync notes with our db
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

	// Anytime the notes array changes, if we don't have a currentNoteId, set it.
	// When we rerender, snapshot listen and sync notes => sets our currentNodeId.
	useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id);
		}
	}, [notes]);

	// void; creates newNote object.
	// Add newNote to beginning of notes state... thus, update currentNoteId as newNode.id
	async function createNewNote() {
		const newNote = {
			// id: nanoid(), Firestore will create it's own id
			body: "# Type your markdown note's title here",
		};
		const newNoteRef = await addDoc(notesCollection, newNote);
		setCurrentNoteId(newNoteRef.id);
	}

	// void, update the current note.body's text for every keystroke
	async function updateNote(text) {
		const docRef = doc(db, "notes", currentNoteId);
		await setDoc(docRef, { body: text }, { merge: true });
	}

	async function deleteNote(noteId) {
		const docRef = doc(db, "notes", noteId);
		await deleteDoc(docRef);
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
					<Editor currentNote={currentNote} updateNote={updateNote} />
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
