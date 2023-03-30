<template>
    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/bg-02.jpg')">
            <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                <form @submit.prevent="login" class="login100-form validate-form flex-sb flex-w">
                    <span class="login100-form-title">
                        Sign Up Perpustakaan
                    </span>

                    <div class="p-t-31 p-b-9">
                        <span class="txt1">
                            Nama
                        </span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Username is required">
                        <input class="input100" type="text" autocomplete="off" required name="username" v-model="name">
                        <span class="focus-input100"></span>
                    </div>

                    <div class="p-t-31 p-b-9">
                        <span class="txt1">
                            Email
                        </span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Email is required">
                        <input class="input100" type="email" autocomplete="off" required name="email" v-model="email">
                        <span class="focus-input100"></span>
                    </div>

                    <div class="p-t-13 p-b-9">
                        <span class="txt1">
                            Password
                        </span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" required name="pass" v-model="password">
                        <span class="focus-input100"></span>
                    </div>

                    <div class="container-login100-form-btn m-t-17">
                        <button type="submit" class="login100-form-btn" style="color: white;">
                            Sign In
                        </button>
                    </div>

                    <div class="w-full text-center p-t-55">
                        <span class="txt2">
                            Have account?
                        </span>

                        <router-link to="/login" class="txt2 bo1">
                            Login now
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'

Vue.use(axios)

export default {
    data() {
        return {
            account: {},
            name: '',
            email: '',
            password: ''
        }
    },
    created() {
        if (this.$store.state.token !== '') {
            this.axios.post('http://localhost:8000/api/checkToken', { header: { 'Authorization': 'bearer' + this.$store.state.token } })
                .then(
                    (response) => {
                        console.log(response)
                        this.$router.push('/')
                    })
                .catch(
                    (err) => {
                        console.log(err)
                        this.$store.commit('clearToken')
                    }
                )
        }
    },
    methods: {
        login(){
            let data = {
                name : this.name,
                email : this.email,
                password : this.password
            }
            axios.post("http://localhost:8000/api/register" , data)
            .then(
                (response) => {
                    this.$store.commit('setToken', response.data.token)
                    swal({
                        icon: "success"
                    })
                    location.href = '/'
                }
            )

            .catch(
                (err) => {
                    console.log(err)
                    swal({
                        title: "Error",
                        icon: "error"
                    })
                }
            ) 
        }
    }
}
</script>