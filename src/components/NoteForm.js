import { useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const NoteForm = ({ onNoteCreated }) => {
    const [message, setMessage] = useState("");
    const [passcode, setPasscode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message || !passcode) return alert("Both fields are required!");

        try {
            const docRef = await addDoc(collection(db, "notes"), {
                message,
                passcode,
                createdAt: new Date(),
            });

            onNoteCreated(docRef.id);
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Write your secret love note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Set a passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
            />
            <button type="submit">Create Love Note 💖</button>


        </form>
    );
};

export default NoteForm;