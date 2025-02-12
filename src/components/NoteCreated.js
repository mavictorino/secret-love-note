

const NoteCreated = ({ noteId }) => {
    const noteLink = `${window.location.origin}/note/${noteId}`;

    return (
        <div>
            <p>Your secret love note is ready! 🎉</p>
            <input type="text" value={noteLink} readOnly />
            <button onClick={() => navigator.clipboard.writeText(noteLink)}>Copy link 🔗</button>
        </div>
    );
};

export default NoteCreated;