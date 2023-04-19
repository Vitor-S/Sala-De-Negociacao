import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig'
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const app = initializeApp(firebaseConfig)
export const auth = getAuth();
export const db = getFirestore(app)

const createUserDocumentFromAuth = async (userAuth, data) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth
        
        try{
            await setDoc(userDocRef, {
                email,
                id: userAuth.uid,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                supplier: Boolean(data.supplier),
                area: data.area,
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
            })
        }catch(error){
            alert(error)
        }
    }
}

export const Api = {
    createUserWithEmailAndPassword: async (data, navigate) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await createUserDocumentFromAuth(user, data)
                // ...
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    },

    signInWithEmailAndPassword: async (email, password, navigate) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                //get user data
                const userDocRef = doc(db, 'users', user.uid)
                const userSnapShot = await getDoc(userDocRef)

                //redirect
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    },

    getDocumentFromCurrentUser: async () => {
        
    },

    getDocById: async (userId, setState) => {
        const db = getFirestore()
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        setState(docSnap.data())
    } ,

    getAllDocs: async (col, setState) => {
        const colRef = collection(db, col)
        const snapShots = await getDocs(colRef)
        
        let docs = []
        snapShots.forEach(doc => {
            if(doc.id != auth.currentUser.uid) docs.push(doc.data())
        })

        setState(docs)
    },

    signOut: async (navigate) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
          }).catch((error) => {
            // An error happened.
            alert(error)
          });    
    }
}