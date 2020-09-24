import axios from 'axios'
const baseURL = '/api/'

const getAll = () => {
    return axios.get(baseURL + "posts")
                .then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseURL  + "posts", newObject)
                .then(response => response.data)
}

const update = (thing) => {
    console.log("thing post: ", thing)
    return axios.put(baseURL + "posts/" + thing.id, thing)
                .then(response => response.data)
}

const del = (postid) => {
    return axios.delete(baseURL + "posts/" + postid)
                .then(response => response.data)
}

export default { getAll, create, update, del }