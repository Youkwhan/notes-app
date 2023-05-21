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
	// Editor component state to hold our currentNote's body text, so we dont have to keep updating db for each keystroke
	const [tempNoteText, setTempNoteText] = useState("");

	// Every render, initalize currentNode object. Logic to find the object else render "Create New Note" menu
	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	const sortedNotes = notes.sort(compareTime);

	// my LRU function
	function compareTime(a, b) {
		if (a.updatedAt > b.updatedAt) {
			return -1; // sort a before b
		}
		if (a.updatedAt < b.updatedAt) {
			return 1; // sort a after b
		}
		return 0; // keep original order
	}

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

	// Anytime the notes array changes, if we don't have a currentNoteId, set it. (Which will happen when we delete all notes or First load waiting for data to come in)
	useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id);
		}
	}, [notes]);

	// If currentNote changes (like selecting another note tab), override our setTempNoteText to be our new current body to record the keystrokes
	useEffect(() => {
		if (currentNote) {
			setTempNoteText(currentNote.body);
		}
	}, [currentNote]);

	// To send our currentNote's tempNoteText to our db.
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			updateNote(tempNoteText);
		}, 500);
		// If run again, reset our timer by canceling the old one
		return () => clearTimeout(timeoutId);
	}, [tempNoteText]);

	// void; creates newNote object.
	// Add newNote to beginning of notes state... thus, update currentNoteId as newNode.id
	async function createNewNote() {
		const newNote = {
			// id: nanoid(), Firestore will create it's own id
			body: "# Type your markdown note's title here",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		const newNoteRef = await addDoc(notesCollection, newNote);
		setCurrentNoteId(newNoteRef.id);
	}

	// void, update the current note.body's text for every keystroke
	async function updateNote(text) {
		const docRef = doc(db, "notes", currentNoteId);
		await setDoc(
			docRef,
			{ body: text, updatedAt: Date.now() },
			{ merge: true }
		);
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
						notes={sortedNotes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					<Editor
						tempNoteText={tempNoteText}
						setTempNoteText={setTempNoteText}
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
