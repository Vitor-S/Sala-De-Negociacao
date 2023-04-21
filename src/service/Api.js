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
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        setState(docSnap.data())
    },

    returnDocById: async (userId) => {
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    },

    getAllDocs: async (col, setState) => {
        const colRef = collection(db, col)
        const snapShots = await getDocs(colRef)
        
        let docs = []
        snapShots.forEach(doc => {
            if(doc.id != auth.currentUser.uid) docs.push(doc.data())
        })

        setState(docs)
    },

    getReceivedMeetings: async(col, id, setState) => {
        const colRef = collection(db, col)
        const snapShots = await getDocs(colRef)
        
        let docs = []
        snapShots.forEach(doc => {
            if((doc.data().receiver == id) || (doc.data().sender == id) ) docs.push(doc.data())
        })

        setState(docs)
    },

    handleWithConnections: async (id1, id2) => {
        const ids = [id1, id2]
        let myData = []

        const promises = ids.map(async id => {
            const myPromise = await Api.returnDocById(id)
            return myPromise
        })

        myData = await Promise.all(promises)

        if(myData[0].connections && !myData[0].connections.includes(myData[1].id)){
            myData[0].connections = [...myData[0].connections, myData[1].id]
        }
        else if(myData[0].connections && myData[0].connections.includes(myData[1].id)){
            myData[0].connections = myData[0].connections
        }
        else myData[0].connections = [myData[1].id]

        await setDoc(doc(db, 'users', myData[0].id), myData[0])

        if(myData[1].connections && !myData[1].connections.includes(myData[0].id)){
            myData[1].connections = [...myData[1].connections, myData[0].id]
        }
        else if(myData[1].connections && myData[1].connections.includes(myData[0].id)){
            myData[1].connections = myData[1].connections
        }
        else myData[1].connections = [myData[0].id]

        await setDoc(doc(db, 'users', myData[1].id), myData[1])
    },

    getCurrentUser: async(setState) => {
        setState(auth.currentUser)
    },

    signOut: async (navigate) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
          }).catch((error) => {
            // An error happened.
            alert(error)
          });    
    },

    getConnections: async (id) => {
        // As funções async retornam Promises, portanto, o loop forEach não aguardará a resolução das Promises antes de continuar para a próxima iteração

        const userData = await Api.returnDocById(id)
        let connectionsData = []

        if (userData.connections) {
            const promises = userData.connections.map(async con => {
                const conData = await Api.returnDocById(con)
                return conData
            })

            connectionsData = await Promise.all(promises)
        }

        return connectionsData
    },

}