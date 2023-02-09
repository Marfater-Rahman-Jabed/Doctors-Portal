import { useEffect, useState } from "react";

const useToken = email => {

    const [token, setToken] = useState('')

    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-nu-nine.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('accessToken', data.accessToken)
                    // console.log(data.accessToken)
                    setToken(data.accessToken)
                })
        }
    }, [email])

    return [token];
}

export default useToken;