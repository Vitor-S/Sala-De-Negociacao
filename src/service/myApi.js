import { db, auth, storage } from './myFirebaseConfig'

import { doc, getDoc, getDocs, setDoc, collection, query } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const myApi = {
    createUserDocumentFromAuth: async (userAuth, data) => {
        const userDocRef = doc(db, 'users', userAuth.uid)
        const userSnapShot = await getDoc(userDocRef)

        if (!userSnapShot.exists()) {
            const { displayName, email } = userAuth

            try {
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
            } catch (error) {
                alert(error)
            }
        }
    },

    createUserWithEmailAndPassword: async (data, navigate) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await myApi.createUserDocumentFromAuth(user, data)
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

    signOut: async (navigate) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            alert(error)
        });
    },

    getDocById: async (collectionName, userId) => {
        const docRef = doc(db, collectionName, userId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    },

    addURLToUserDoc: async (url) => {
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        const userSnapShot = await (await getDoc(userDocRef)).data()
        userSnapShot.PhotoUrl = url

        try {
            await setDoc(userDocRef, userSnapShot)
            console.log('ok')
        } catch (error) {
            alert(error)
        }
    },

    getConditional: async (collectionName, wheres) => {
        const colelctionRef = collection(db, collectionName)
        let result = []

        const myQuery = query(colelctionRef, ...wheres)
        const snapShots = await getDocs(myQuery)

        snapShots.forEach((doc) => {
            if (doc.id != auth.currentUser.uid) result.push(doc.data())
        });

        return result

    },

    getMultiples: async (collectionName, wheres, op) => {
        //para pegar todos os dados de uma coleção use where == []
        //se o 'op' estiver vazio sera considerado o como &&

        const colelctionRef = collection(db, collectionName)
        let result = []

        if (op == '&&') {
            const myQuery = query(colelctionRef, ...wheres)
            const snapShots = await getDocs(myQuery)

            snapShots.forEach((doc) => {
                result.push(doc.data())
            });

            return result
        }
        else if (op == '||') {
            for (let where of wheres) {
                const snapshots = await getDocs(query(colelctionRef, where))

                snapshots.forEach(doc => {
                    result.push(doc.data())
                })
            }
            return result
        }
        else if (wheres.length == 0) {
            const myQuery = query(colelctionRef, ...wheres)
            const snapShots = await getDocs(myQuery)

            snapShots.forEach((doc) => {
                result.push(doc.data())
            });

            return result
        }

    },

    setConnections: async (id1, id2) => {
        const ids = [id1, id2]
        let myData = []

        const promises = ids.map(async id => {
            const myPromise = await myApi.getDocById("users", id)
            return myPromise
        })

        myData = await Promise.all(promises)

        if (myData[0].connections && !myData[0].connections.includes(myData[1].id)) {
            myData[0].connections = [...myData[0].connections, myData[1].id]
        }
        else if (myData[0].connections && myData[0].connections.includes(myData[1].id)) {
            myData[0].connections = myData[0].connections
        }
        else myData[0].connections = [myData[1].id]

        await setDoc(doc(db, 'users', myData[0].id), myData[0])

        if (myData[1].connections && !myData[1].connections.includes(myData[0].id)) {
            myData[1].connections = [...myData[1].connections, myData[0].id]
        }
        else if (myData[1].connections && myData[1].connections.includes(myData[0].id)) {
            myData[1].connections = myData[1].connections
        }
        else myData[1].connections = [myData[0].id]

        await setDoc(doc(db, 'users', myData[1].id), myData[1])
    },

    getConnections: async (id) => {
        // As funções async retornam Promises, portanto, o loop forEach não aguardará a resolução das Promises antes de continuar para a próxima iteração

        //retorna todos os id ao qual o usuário(id) está connectado

        const userData = await myApi.getDocById('users', id)
        let connectionsData = []

        if (userData.connections) {
            const promises = userData.connections.map(async con => {
                const conData = await myApi.getDocById('users', con)
                return conData
            })

            connectionsData = await Promise.all(promises)
        }

        return connectionsData
    },

    getImage: async (folder, file) => {
        const imageRef = ref(storage, `${folder}/${file}`)
        const url = await getDownloadURL(imageRef);
        return url
    },

    setImage: async (event, setPorgessPorcent, setImgURL, folder, userId) => {
        event.preventDefault();

        const file = event.target[0]?.files[0];
        if (!file) return;

        const storageRef = ref(storage, `${folder}/${userId}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPorgessPorcent(progress);
        }, (error) => {
            alert(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                myApi.addURLToUserDoc(downloadURL)
                setImgURL(downloadURL);
            });
        }
        )

    },

    getExcept: async (collectionName) => {
        const colRef = collection(db, collectionName)
        const snapShots = await getDocs(colRef)

        let docs = []
        snapShots.forEach(doc => {
            if (doc.id != auth.currentUser.uid) docs.push(doc.data())
        })

        return docs
    },

    getAllAttributes: async (attribute) => {
        let allUsers = await myApi.getExcept('users')
        const areas = allUsers.map(user => {
            return user[attribute]
        })
        return areas
    },

    resetPassword: (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Verifique seu email")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Algo deu errado" +' '+ errorMessage)
            });
    }
}

export default myApi