<template>
    <div class="personal-center">
        <div class="information">
            <h3>个人信息修改</h3>
            <form @submit.prevent="updateInformation">

                <p>姓名：</p>
                <el-input v-model="input" placeholder="name" class="short-input"></el-input>

                <div>
                    <p>性别：</p>
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="2">女</el-radio>
                </div>

                <p>年龄：</p>
                <el-input v-model="input" placeholder="age" class="short-input"></el-input>

                <p>地址：</p>
                <el-input v-model="input" placeholder="addr" class="short-input"></el-input>

                <p>出生日期：</p>
                <div class="block">
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="margin-bottom: 20px;">
                    </el-date-picker>
                </div>

                <el-button type="primary">确认修改</el-button>

            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            user: {
                name: 'John Doe',
                age: 21,
                addr: '123123',
                birth: '2023-08-09'
            },
            radio: '1'
        };
    },
    methods: {
        updateInformation() {
            axios.put('/edit', this.user)
                .then(response => {
                    console.log('Updated information:', this.user);
                    // 可以根据后端返回的结果进行处理
                })
                .catch(error => {
                    console.error(error);
                    // 可以进行错误处理
                });
        },
        getUserInfo() {
            axios.get('/getInfo', { params: { token: 'your_token_here' } })
                .then(response => {
                    const user = response.data;
                    console.log('User info:', user);
                    // 可以进行用户信息的处理
                })
                .catch(error => {
                    console.error(error);
                    // 可以进行错误处理
                });
        }
    }
};
</script>
  
<style>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label {
    margin-bottom: 5px;
}

.short-input {
    margin-bottom: 5px;
    width: 300px;
}
</style>