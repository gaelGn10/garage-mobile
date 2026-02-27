import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { payRepair } from "../services/paymentService";

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const amount = 150; // FAKE montant

  const handlePayment = async () => {
    await payRepair(Number(id), amount);
    history.push("/tabs/cars");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Paiement</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h2>Montant à payer : {amount} €</h2>
        </IonText>

        <IonButton expand="block" onClick={handlePayment}>
          Payer
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
