// src/ToDoList.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

interface ToDoItem {
  id: string;
  text: string;
}

const ToDoList: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todosList: ToDoItem[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      text: doc.data().text
    }));
    setTodos(todosList);
  };

  const handleAddToDo = async () => {
    if (text.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, 'todos'), { text });
      setTodos([...todos, { id: docRef.id, text }]);
      setText('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ToDo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">New ToDo</IonLabel>
          <IonInput
            value={text}
            onIonChange={(e) => setText(e.detail.value!)}
            placeholder="Enter ToDo item"
          />
        </IonItem>
        <IonButton expand="block" onClick={handleAddToDo}>Add ToDo</IonButton>
        <IonList>
          {todos.map(todo => (
            <IonItem key={todo.id}>
              <IonLabel>{todo.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ToDoList;
