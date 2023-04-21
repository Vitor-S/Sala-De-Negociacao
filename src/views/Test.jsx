import React, { useEffect, useState } from 'react'
import { Api, db } from '../service/Api'
import { doc, setDoc } from 'firebase/firestore'

export default function Test() {

    const id1 = 'HBGZv4EAWmTjngdc2DPd6DMnMZo2'
    const id2 = 'O7rxfgCYJIQjw5WX6B3CZQopEyJ3'
    
    const handleWithConnections = async (id1, id2) => {
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
    }

    return (
        <div>
            <button onClick={() => handleWithConnections(id1, id2)}>click</button>
        </div>
    )
}
