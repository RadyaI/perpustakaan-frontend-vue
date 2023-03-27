<template>
    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/bg-02.jpg')">
            <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                <form @submit.prevent="login" class="login100-form validate-form flex-sb flex-w">
                    <span class="login100-form-title p-b-53">
                        Login Perpustakaan
                    </span>

                    <div class="p-t-31 p-b-9">
                        <span class="txt1">
                            Email
                        </span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Username is required">
                        <input class="input100" type="email" autocomplete="off" required name="username" v-model="email">
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
                            Not a member?
                        </span>

                        <a href="#" class="txt2 bo1">
                            Sign up now
                        </a>
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
        login() {
            var data = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:8000/api/login', data)
                .then(
                    (response) => {

                        // localStorage.setItem('token', response.data.token)
                        // localStorage.setItem('status', true)
                        // this.$emit('authenticated', true)
                        this.$store.commit('setToken', response.data.token)
                        location.href = '/'

                    }
                )
                .catch(
                    (err) => {
                        console.log(err)
                        swal('Email atau password salah', {
                            icon: 'error'
                        })
                    }
                )
        }
    },
    mounted() {
        this.$emit('aunthenticated', false)
    }
}
</script>