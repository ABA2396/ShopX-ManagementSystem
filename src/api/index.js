import axios from 'axios'

//分页获取用户数据
export const getUsers = (params) => {
    return axios
        .get('/api/user/getUsers/' + params.pageNo + '/' + params.pageSize, {
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