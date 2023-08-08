import { FirebaseApp } from '@firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Auth,
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updatePassword,
    updateProfile,
    User,
    UserCredential,
    initializeAuth,

} from 'firebase/auth';

import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';



function atomWithAsyncStorage<T>(key: string, initialValue: T) {
    const baseAtom = atom(initialValue)
    baseAtom.onMount = (setValue) => {
        ; (async () => {
            const item = await AsyncStorage.getItem(key)
            if (item !== null)
                setValue(JSON.parse(item))
        })()
    }
    const derivedAtom = atom(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue =
                typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            if (nextValue === undefined || nextValue === null)
                AsyncStorage.removeItem(key);
            else
                AsyncStorage.setItem(key, JSON.stringify(nextValue));
        }
    )
    return derivedAtom
}
;



const userAtom = atomWithAsyncStorage<User | undefined | null>("user", undefined);
const authAtom = atomWithAsyncStorage<Auth | undefined | null>("auth", undefined);
const usernameAtom = atomWithAsyncStorage<string>("username", "");
const passwordAtom = atomWithAsyncStorage<string>("password", "");




export const useFirebaseAuthentication = () => {
    const [user, setUser] = useAtom(userAtom);
    const [auth, setAuth] = useAtom(authAtom);

    const [username, setUsername] = useAtom(usernameAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [isBusy, setIsBusy] = useState(false);




    const initializeFireBaseAuth = (firebaseApp: FirebaseApp, onLoggedIn?: () => void, onLoggedOut?: () => void) => {
        console.log("initializeFireBaseAuth");
        setIsBusy(true);
        try {
            const auth = getAuth(firebaseApp);
            if (!auth) {

                const res = initializeAuth(firebaseApp);
            }
            auth.onAuthStateChanged((user) => {
                console.log("onAuthStateChanged");
                setIsBusy(false);
                if (user !== null && user !== undefined) {
                    setUser(user);
                    onLoggedIn && onLoggedIn();
                }
                else {
                    setUser(undefined);
                    onLoggedOut && onLoggedOut();
                }

            });
            setAuth(auth);
        }

        catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        if (!auth) throw new Error("Firebase auth not initialized");
        // const auth = getAuth(firebaseApp);
        setPassword("");
        setUsername("");
        await getAuth().signOut();
    };



    const changePassword = async (
        oldPassword: string,
        newPassword: string,

    ): Promise<{ success: boolean; message?: string }> => {
        if (!auth) throw new Error("Firebase auth not initialized");
        // const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        if (user && user.email) {
            try {
                const credentialUser = await reauthenticateWithCredential(
                    user,
                    EmailAuthProvider.credential(user.email, oldPassword)
                );

                await updatePassword(credentialUser.user, newPassword);
                return { success: true };
            } catch (error) {
                throw error;
            }
        }
        return { success: false, message: "User not found" };
    };

    const register = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,


    ): Promise<UserCredential> => {
        if (!auth) throw new Error("Firebase auth not initialized");


        const createUserResponse = await createUserWithEmailAndPassword(
            getAuth(),
            email.trim().toLowerCase(),
            password
        );

        try {

            if (auth?.currentUser)
                await updateProfile(auth?.currentUser, {
                    displayName: firstName + " " + lastName,
                });
        } catch (error) {
            console.error("register: ", error);
            throw error;
        }

        return createUserResponse;
    };


    const login = async (email: string, password: string, saveEmail = false, savePassword = false) => {

        const auth = getAuth();
        if (!auth) throw new Error("Firebase auth not initialized");
        setIsBusy(true);
        try {
            const credentialUser = await signInWithEmailAndPassword(
                getAuth(),
                email.trim().toLowerCase(),
                password
            );

            if (saveEmail && credentialUser.user) {
                setUsername(email);

            }
            if (savePassword && credentialUser.user) {
                setPassword(password);

            }

            return credentialUser;
        } catch (error) {
            console.log("Login", error);
            throw error;
        }
        finally {
            setIsBusy(false);
        }
    };

    const sendResetPasswordEmail = async (
        email: string,

    ): Promise<void> => {
        try {



            await sendPasswordResetEmail(getAuth(), email);

        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const removeUser = async (password: string): Promise<boolean> => {
        try {
            const auth = getAuth();
            setIsBusy(true);


            let removeUserResult = false;
            if (auth.currentUser) {
                if (auth.currentUser.email && password) {
                    const credentialUser = await reauthenticateWithCredential(
                        auth.currentUser,
                        EmailAuthProvider.credential(auth.currentUser.email, password)
                    );
                    console.log("REAUTHENTICATION RESULT", credentialUser);
                    if (credentialUser) {
                        await deleteUser(auth.currentUser);
                        removeUserResult = true;
                    }
                }
            }
            return removeUserResult;
        } catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setIsBusy(false);
        }
    }



    return { initializeFireBaseAuth, user, logout, login, sendResetPasswordEmail, removeUser, isBusy, changePassword, register, username, password };
}

