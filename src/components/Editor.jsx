import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import PropTypes from "prop-types";

export default function Editor({ tempNoteText, setTempNoteText }) {
	const [selectedTab, setSelectedTab] = useState("write");

	// preview tab basically
	const converter = new Showdown.Converter({
		tables: true,
		simplifiedAutoLink: true,
		strikethrough: true,
		tasklists: true,
	});

	// render Markdown Editor + js converter => html (preview tab)
	return (
		<section className="pane editor">
			<ReactMde
				value={tempNoteText}
				onChange={setTempNoteText}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
				generateMarkdownPreview={(markdown) =>
					Promise.resolve(converter.makeHtml(markdown))
				}
				minEditorHeight={80}
				heightUnits="vh"
			/>
		</section>
	);
}

Editor.propTypes = {
	tempNoteText: PropTypes.string.isRequired,
	setTempNoteText: PropTypes.func.isRequired,
};
