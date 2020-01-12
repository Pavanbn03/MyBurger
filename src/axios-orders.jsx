import axios from 'axios';
const instance = axios.create({
    baseURL:'https://burgerbuilder03031998.firebaseio.com/'
});
export default instance;