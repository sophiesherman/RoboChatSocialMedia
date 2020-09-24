import axios from 'axios'
const baseURL = '/api/'

const getAll = () => {
    return axios.get(baseURL + "users")
                .then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseURL  + "users", newObject)
                .then(response => response.data)
}

const update = (thing) => {
    console.log("thing is: ", thing)
    return axios.put(baseURL + "users/" + thing.id, thing)
                .then(response => response.data)
}

const del = (id) => {
    return axios.delete(baseURL + "users/" + id)
                .then(response => response.data)
}

const login = ({username, password}) => {
    console.log("POST", baseURL + 'login')
    return axios.post(baseURL + 'login', {username, password})
                .then(response => response.data)
}


export default { getAll, create, update, del, login}