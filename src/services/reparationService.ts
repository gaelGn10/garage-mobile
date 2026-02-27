import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export interface Reparation {
    brand: string;
    model: string;
    plate: string;
    interventions: string[];
    status: "WAITING" | "IN_REPAIR" | "DONE";
    createdAt: Timestamp;
}

export const addReparation = async (reparation: Omit<Reparation, "createdAt" | "status">): Promise<string> => {
    try {
        const docRef = await addDoc(collection(firestore, "reparation"), {
            ...reparation,
            status: "WAITING",
            createdAt: Timestamp.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};
