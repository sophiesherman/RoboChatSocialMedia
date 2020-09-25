import axios from 'axios'
const baseURL = '/api/'

const getAll = () => {
    return axios.get(baseURL + "posts")
                .then(response => response.data)
}

const create = (newObject, user) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token} }
    return axios.post(baseURL  + "posts", newObject, config)
                .then(response => response.data)
}

const update = (thing) => {
    return axios.put(baseURL + "posts/" + thing.id, thing)
                .then(response => response.data)
}

const del = (postid) => {
    return axios.delete(baseURL + "posts/" + postid)
                .then(response => response.data)
}

export default { getAll, create, update, del }