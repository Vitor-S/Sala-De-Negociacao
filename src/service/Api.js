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
const db = getFirestore()

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
                navigate('/', { state: userSnapShot.data() })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    },

    getDocumentFromCurrentUser: async () => {
        
    },

    getCurrentUser: async (setState) => {
        const colRef = collection(db, 'users')
        const snapShots = await getDocs(colRef)

        const user = snapShots.docs.map(doc => {
        if(doc.id == auth.currentUser.uid) setState(doc.data())
    })
    },

    // getAllDocs: async (setState) => {
    //     const colRef = collection(db, 'users')
    //     const snapShots = await getDocs(colRef)

    //     const docs = snapShots.docs.map(doc => {
    //         const data = doc.data()
    //         data.id == doc.id
    //         return data
    //     })
    //     setState(docs)
    // },

    signOut: async (navigate) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login', { state: 'name'})
          }).catch((error) => {
            // An error happened.
            alert(error)
          });    
    }
}