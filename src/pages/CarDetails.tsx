import {
    IonBadge,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { firestore } from "../config/firebaseConfig";

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const unsubscribe = onSnapshot(doc(firestore, "reparation", id), (doc) => {
            if (doc.exists()) {
                setCar({ id: doc.id, ...doc.data() });
            } else {
                setCar(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    if (loading) {
        return <IonContent className="ion-padding">Chargement...</IonContent>;
    }

    if (!car) {
        return <IonContent className="ion-padding">Voiture non trouvée</IonContent>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{car.brand} {car.model}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <div className="ion-margin-bottom">
                    <h2>Informations</h2>
                    <p>Plaque: {car.plate}</p>
                    <p>Statut: <IonBadge color={car.status === "DONE" ? "success" : "warning"}>{car.status}</IonBadge></p>
                    {/* Assuming interventions are stored as an array of strings in Firestore */
                        car.interventions && (
                            <p>Interventions demandées: {Array.isArray(car.interventions) ? car.interventions.join(", ") : car.interventions}</p>
                        )
                    }
                    {car.description && <p>Description: {car.description}</p>}
                </div>

                {/* Repairs section can be enhanced if sub-collection or array exists. 
                    For now, showing status implies progress. 
                    If you store specific repair steps, iterate them here. 
                */}
                <h3>Détails</h3>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2>État global</h2>
                            <p>{car.status === "DONE" ? "Réparations terminées" : "En cours de traitement"}</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonButton expand="block" routerLink={`/payment/${id}`} className="ion-margin-top">
                    Payer et récupérer la voiture
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CarDetails;
