import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
});

export default instance;