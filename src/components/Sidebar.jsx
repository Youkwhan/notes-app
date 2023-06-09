import PropTypes from "prop-types";
import "./Sidebar.css";

// jsx; Render noteElements tabs, able to focus and select a tab, create a new tab
export default function Sidebar(props) {
	// array of jsx; onClick on each tab (div) to listen and setCurrentNodeId on the one we click.
	// On render if one of the tab's id === currentNodeId give it the selected-note CSS
	const noteElements = props.notes.map((note) => {
		return (
			<div key={note.id}>
				<div
					className={`title ${
						note.id === props.currentNote.id ? "selected-note" : ""
					}`}
					onClick={() => props.setCurrentNoteId(note.id)}
				>
					<h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
					<button
						className="delete-btn"
						onClick={() => props.deleteNote(note.id)}
					>
						<i className="gg-trash trash-icon"></i>
					</button>
				</div>
			</div>
		);
	});

	return (
		<section className="pane sidebar">
			<div className="sidebar--header">
				<h3>Notes</h3>
				<button className="new-note" onClick={props.newNote}>
					+
				</button>
			</div>
			{noteElements}
		</section>
	);
}

Sidebar.propTypes = {
	notes: PropTypes.array.isRequired,
	currentNote: PropTypes.object.isRequired,
	setCurrentNoteId: PropTypes.func.isRequired,
	newNote: PropTypes.func.isRequired,
	deleteNote: PropTypes.func.isRequired,
};
