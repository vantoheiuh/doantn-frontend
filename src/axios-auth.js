import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://54.151.129.13:5000'
});

export default instance;