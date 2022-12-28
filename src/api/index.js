import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.10.100.21:8762'
})