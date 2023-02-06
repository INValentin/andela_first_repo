const BASE_URL = location.hostname === 'localhost' ? 'http://localhost:5000' : "";


const login = async (creds) => {
    return request('/auth/login', { method: 'POST', body: creds })
}

const getBlogComments = async (blogId) => {
    return request(`/blogs/${blogId}/comments`)
}

const likeAblog = async (blogId) => {
    return request(`/blogs/${blogId}/like`, { method: 'POST' })
}

const commentToAblog = async (blogId, commentData) => {
    return request(`/blogs/${blogId}/comments`, { body: commentData, method: 'POST' })
}

const updateAblogComment = async (blogId, commentId, newCommentData) => {
    return request(`/blogs/${blogId}/comments/${commentId}`, { method: 'PUT', body: newCommentData })
}

const deleteAblogComment = async (blogId, commentId) => {
    return request(`/blogs/${blogId}/comments/${commentId}`, { method: 'DELETE' })
}

const apiRequest = (func, successCallback, errorCallback) => {
    func().then(async (/**@type {Response} */ res) => {
        let data = await res.json()
        if (res.ok) {
            return successCallback(data)
        } else {
            return errorCallback(data?.error?.toString() || '')
        }
    }).catch(error => {
        errorCallback((error?.error || error?.message || error || '')?.toString())
    })
}

const request = (url, options = {}) => {
    return fetch(BASE_URL + url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + (localStorage.getItem('authToken') ?? '')
        }
    })
}

function apiGenerator(route) {

    return {
        list: () => {
            return request(`/${route}`)
        },
        create: body => {
            return request(`/${route}`, { body, method: 'POST' })
        },
        get: (id) => request(`/${route}/${id}`),
        update: (id, body) => {
            return request(`/${route}/${id}`, { body, method: 'PUT' })
        },
        delete: (id) => {
            return request(`/${route}/${id}`, { method: 'DELETE' })
        }

    }
}

const blogs = {
    ...apiGenerator('blogs'),
    getBlogComments,
    deleteAblogComment,
    likeAblog,
    updateAblogComment,
    commentToAblog
}

const API = {
    login,
    blogs,
    users: apiGenerator('users'),
    contacts: apiGenerator('contacts'),
    request: apiRequest
}