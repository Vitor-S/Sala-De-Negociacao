import React, { useState, useEffect } from "react";
import { getDownloadURL, ref } from 'firebase/storage'
import { Api } from '../service/Api'

export default function Test() {

    const [picUrl, setPicUrl] = useState()

    useEffect(() => {
        (async() => {
            const Url = await Api.getImage('images', 'mooncake.jpg')
            setPicUrl(Url)
        })()
    }, [])
    

    return (
        <div>
            ok
        </div>
    );
}