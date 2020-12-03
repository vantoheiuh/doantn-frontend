import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://54.151.134.255:5000/'
});

export default instance;