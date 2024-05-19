// src/SignUp.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from './firebase';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setAlertMessage('User already exists');
        setShowAlert(true);
      } else {
        // Store user data in Firestore
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
        });
        setAlertMessage('Welcome User');
        setShowAlert(true);
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAlertMessage('User already exists');
      } else {
        setAlertMessage('Sorry, can\'t sign up');
      }
      setError(error.message);
      setShowAlert(true);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    if (alertMessage === 'Welcome User') {
      history.push('/home');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            value={password}
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <IonButton expand="block" onClick={handleSignUp}>Sign Up</IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleAlertDismiss}
          header={'Alert'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
