import {
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonLoading,
    IonPage,
    IonToast
} from "@ionic/react";
import { lockClosedOutline, personOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "./AuthContext";

const Login: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        if (isSignup && password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            if (isSignup) {
                await auth.signup(email, password);
            } else {
                await auth.login(email, password);
            }
            history.push("/tab1");
        } catch (err: any) {
            console.error("Auth error:", err);
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen className="bg-gradient-primary ion-padding flex-center">
                <div className="flex flex-col justify-center h-full max-w-md mx-auto">
                    <div className="text-center mb-8 animate-slide-up">
                        <IonIcon icon={personOutline} style={{ fontSize: '4rem', color: 'var(--ion-color-secondary)' }} />
                        <h1 className="text-3xl font-bold text-white mt-2">Garage App</h1>
                    </div>

                    <div className="glass-card p-6 animate-fade-in">
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <h2 className="text-xl font-bold text-white">{isSignup ? "Inscription" : "Bienvenue"}</h2>
                            <p className="text-sm text-gray-300">{isSignup ? "Créez votre compte pour commencer" : "Connectez-vous pour accéder à votre garage"}</p>
                        </div>

                        <IonList className="bg-transparent">
                            <IonItem className="glass-input mb-4" lines="none">
                                <IonIcon icon={personOutline} slot="start" className="text-gray-300" />
                                <IonInput
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onIonChange={e => setEmail(e.detail.value!)}
                                    className="text-white custom-input"
                                />
                            </IonItem>

                            <IonItem className="glass-input mb-4" lines="none">
                                <IonIcon icon={lockClosedOutline} slot="start" className="text-gray-300" />
                                <IonInput
                                    placeholder="Mot de passe"
                                    type="password"
                                    value={password}
                                    onIonChange={e => setPassword(e.detail.value!)}
                                    className="text-white custom-input"
                                />
                            </IonItem>

                            {isSignup && (
                                <IonItem className="glass-input mb-4 animate-slide-up" lines="none">
                                    <IonIcon icon={lockClosedOutline} slot="start" className="text-gray-300" />
                                    <IonInput
                                        placeholder="Confirmer mot de passe"
                                        type="password"
                                        value={confirmPassword}
                                        onIonChange={e => setConfirmPassword(e.detail.value!)}
                                        className="text-white custom-input"
                                    />
                                </IonItem>
                            )}
                        </IonList>

                        <IonButton
                            expand="block"
                            className="ion-margin-top rounded-btn bg-gradient-brand hover-scale"
                            color="secondary"
                            onClick={handleAuth}
                            disabled={loading}
                        >
                            {isSignup ? "S'inscrire" : "Se connecter"}
                        </IonButton>

                        <IonButton
                            expand="block"
                            fill="clear"
                            className="ion-margin-top text-gray-200 font-medium hover-bright"
                            onClick={() => setIsSignup(!isSignup)}
                            disabled={loading}
                        >
                            {isSignup ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
                        </IonButton>
                    </div>

                    <IonLoading isOpen={loading} message={"Connexion en cours..."} />

                    <IonToast
                        isOpen={!!error}
                        message={error || ""}
                        duration={3000}
                        color="danger"
                        onDidDismiss={() => setError(null)}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

