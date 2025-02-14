import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";


const ViewNote = () => {
    const { id } = useParams();
    const [passcode, setPasscode] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        setMessage(null);
        setError("");
    }, [id]);

    const handleUnlock = async () => {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            setError("Ops, this note doesn't exist!");
            return;
        }

        const data = docSnap.data();
        if (data.passcode !== passcode) {
            setError("Incorrect passcode. Try again!");
            return;
        }

        setMessage(data.message);

        await deleteDoc(docRef);
    };

    return (
        <div className="message">
            {message ? (
                <div>
                    <h2>💌 Your secret love message:</h2>
                    <p className="text-message">{message}</p>
                </div>
            ) : (
                <div>
                    <p>Enter passcode to unlock:</p>
                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                    <button onClick={handleUnlock}>Unlock 💖</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            )}
            
        </div>
    );
}

export default ViewNote;