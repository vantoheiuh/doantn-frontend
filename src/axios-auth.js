import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://13.213.2.28:5000'
});

export default instance;