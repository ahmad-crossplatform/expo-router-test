import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import {} from 'firebase/database'

import {
    Unsubscribe,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { IUser } from '@/types/IUser';
import { useFirebaseAuthentication } from './useFirebaseAuthentication';

// // Initialize Firebase
// firebase.initializeApp({
//     // your Firebase config here
// });


export const useProfile = () => {

    const { user } = useFirebaseAuthentication();
    const [profile, setProfile] = useState<IUser>();

    useEffect(() => {
        var unsubscribe: Unsubscribe
        if (user) {
            const usersRef = collection(getFirestore(), 'users');
            const userRef = doc(usersRef, user.email || user.uid);
            unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    console.log("Document data:", doc.data());
                    setProfile(doc.data() as IUser);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });

        }

        return () => {
            unsubscribe && unsubscribe();
        }
    }, [user]);



    const saveProfile = async (user: IUser) => {
        try {
            const usersRef = collection(getFirestore(), 'users');
            const userRef = doc(usersRef, user.email);
            await setDoc(userRef, JSON.parse(JSON.stringify(user)));
        } catch (error) {
            console.error(error);
        }
    };

    return { profile, saveProfile };
};

