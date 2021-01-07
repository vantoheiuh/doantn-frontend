import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.22.166.32:5000'
});

export default instance;