import React from "react";
import axios from 'axios';

export const getServerSideProps = async () => {
    const { req } = context;
    const { cookies } = req;
    const { token } = cookies.token;

    if(!token){
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    try {
        const response = await axios.get('https://localhost:3000/api/auth/me', {
            headers: {
                Authorization: `bearer ${token}`
            }
        });

        return {
            props: {
                user: response.data.user
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}

const SSRProtected = ({ user }) => {
    return (
        <div>
            <h1>Protected Page</h1>
            <p>Welcome, { user.email }</p>
        </div>
    )
}

export default SSRProtected;