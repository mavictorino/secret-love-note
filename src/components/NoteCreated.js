

const NoteCreated = ({ noteId }) => {
    const noteLink = `${window.location.origin}/note/${noteId}`;

    return (
        <div className="note-created">
            <h2>Your secret love note is ready! 🎉</h2>
            <input type="text" value={noteLink} readOnly />
            <button onClick={() => navigator.clipboard.writeText(noteLink)}>Copy link 🔗</button>
        </div>
    );
};

export default NoteCreated;