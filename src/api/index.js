import axios from 'axios'

//分页获取用户数据
export const getUsers = (params) => {
    return axios
        .get('/api/user/getUsers/' + params.pageNo + '/' + params.pageSize, {
            params: params
        })
        .then((res) => {
            //console.log(res111,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}

//新增用户
export const addUser = (data) => {
    return axios
        .post('/api/user/add', data)
        .then((res) => {
            //console.log(res,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}

//修改用户
export const editUser = (data) => {
    return axios
        .put('/api/user/edit', data)
        .then((res) => {
            //console.log(res,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}

//根据id删除用户
export const delUser = (params) => {
    return axios
        .delete('/api/user/del', {
            params: params
        })
        .then((res) => {
            //console.log(res,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}

//用户登录
export const login = (data) => {
    return axios
        .post('/api/user/login', data)
        .then((res) => {
            //console.log(res,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}

//获取用户信息
export const getInfo = (params) => {
    return axios
        .get('/api/user/getInfo', {
            params: params
        })
        .then((res) => {
            //console.log(res,"res")
            return res.data
        })
        .catch((err) => {
            console.log(err, "err")
        })
}
