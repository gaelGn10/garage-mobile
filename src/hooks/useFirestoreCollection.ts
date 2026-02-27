import {
    collection,
    FirestoreError,
    onSnapshot,
    orderBy,
    OrderByDirection,
    query,
    QueryConstraint,
    where,
    WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../config/firebaseConfig";

/**
 * Types
 */
type WhereClause = [string, WhereFilterOp, any];
type OrderByClause = [string, OrderByDirection];

interface UseFirestoreCollectionOptions {
    whereClauses?: WhereClause[];
    orderByClause?: OrderByClause | null;
}

interface FirestoreDocument {
    id: string;
}

/**
 * Hook pour écouter une collection Firestore en temps réel
 */
const useFirestoreCollection = <T extends FirestoreDocument>(
    collectionName: string,
    options: UseFirestoreCollectionOptions = {}
) => {
    const { whereClauses = [], orderByClause = null } = options;

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    useEffect(() => {
        if (!collectionName) return;

        setLoading(true);

        try {
            const constraints: QueryConstraint[] = [];

            // WHERE
            whereClauses.forEach((w) => {
                constraints.push(where(w[0], w[1], w[2]));
            });

            // ORDER BY
            if (orderByClause) {
                constraints.push(orderBy(orderByClause[0], orderByClause[1]));
            }

            const q = query(
                collection(firestore, collectionName),
                ...constraints
            );

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const docs = snapshot.docs.map(
                        (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        } as T)
                    );

                    setData(docs);
                    setLoading(false);
                },
                (err) => {
                    console.error(err);
                    setError(err);
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            setError(err as FirestoreError);
            setLoading(false);
        }
    }, [collectionName]);

    return { data, loading, error };
};

export default useFirestoreCollection;
