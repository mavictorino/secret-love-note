import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteCreated = ({ noteId }) => {
    const noteLink = `${window.location.origin}/note/${noteId}`;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Link copied to clipboard!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            })
            .catch((err) => {
                toast.error("Failed to copy!", {
                    position: "top-right",
                });
                console.error("Copy failed:", err);
            });
    };

    return (
        <div className="note-created">
            <h2>Your secret love note is ready! 🎉</h2>
            <input type="text" value={noteLink} readOnly />
            <button onClick={() => copyToClipboard(noteLink)}>Copy link 🔗</button>
        </div>
    );
};

export default NoteCreated;
