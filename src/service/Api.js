import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const app = initializeApp(firebaseConfig)
const auth = getAuth();

export default {
    googleLogin: async () => {
        const provider = new GoogleAuthProvider();
        let result = await signInWithPopup(auth, provider).then(user => console.log(user.email)).catch(error => console.log('Algo deu errado: ' + error))
        return result
    },

    emailLogin: async (email, password, action) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user.uid) redirecionar
                auth.onAuthStateChanged(user => {
                    if (user != null) {
                        action()
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    },

    firebaseSignOut: async () => {
        signOut(auth).then(() => {
            console.log('deslogado')
        }).catch((error) => {
            alert(error)
        });
    }
}