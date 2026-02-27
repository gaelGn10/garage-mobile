import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { addReparation } from "../services/reparationService";

const interventionsList = [
    "Frein",
    "Vidange",
    "Filtre",
    "Batterie",
    "Amortisseurs",
    "Embrayage",
    "Pneus",
    "Système de refroidissement"
];

const AddCar: React.FC = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [plate, setPlate] = useState("");
    const [interventions, setInterventions] = useState<string[]>([]);
    const history = useHistory();

    const { data: repairs, loading, error } = useFirestoreCollection<any>("Intervention");

    const toggleIntervention = (name: string) => {
        setInterventions(prev =>
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    const handleAddCar = async () => {
        if (!brand || !model || !plate || interventions.length === 0) {
            alert("Veuillez remplir tous les champs et choisir au moins une intervention");
            return;
        }

        try {
            await addReparation({
                brand,
                model,
                plate,
                interventions
            });
            alert("Voiture ajoutée avec succès !");
            history.push("/tab1");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la voiture", error);
            alert("Erreur lors de l'ajout de la voiture");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="text-xl font-bold">Ajouter une voiture</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding bg-gradient-subtle">
                <div className="animate-fade-in">
                    <IonItem className="glass-input">
                        <IonLabel position="floating">Marque</IonLabel>
                        <IonInput value={brand} onIonChange={e => setBrand(e.detail.value!)} />
                    </IonItem>

                    <IonItem className="glass-input">
                        <IonLabel position="floating">Modèle</IonLabel>
                        <IonInput value={model} onIonChange={e => setModel(e.detail.value!)} />
                    </IonItem>

                    <IonItem className="glass-input">
                        <IonLabel position="floating">Plaque</IonLabel>
                        <IonInput value={plate} onIonChange={e => setPlate(e.detail.value!)} />
                    </IonItem>

                    <h3 className="mt-4 mb-2 text-lg font-semibold">Choisir interventions</h3>
                    <div className="space-y-2 mb-6">
                        {repairs.map((rep, i) => (
                            <IonItem key={i} className="glass-card mb-2" lines="none">
                                <IonLabel>
                                    <h2 className="font-bold">{rep.Nom}</h2>
                                    <p className="text-sm opacity-80">Durée : {rep.Duree} | Prix : {rep.Prix}</p>
                                </IonLabel>
                                <IonCheckbox
                                    slot="end"
                                    checked={interventions.includes(rep.Nom)}
                                    onIonChange={() => toggleIntervention(rep.Nom)}
                                />
                            </IonItem>
                        ))}
                    </div>

                    <div className="pb-24">
                        <IonButton
                            className="mt-8 rounded-btn bg-gradient-primary"
                            expand="block"
                            onClick={handleAddCar}
                        >
                            Ajouter la voiture
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddCar;
