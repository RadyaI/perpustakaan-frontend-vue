<template>
    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/bg-02.jpg')">
            <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33 ">
                <form @submit.prevent="login" class="login100-form validate-form flex-sb flex-w">
                    <span style="font-size: 25px;" class="login100-form-title p-b-53 animate__animated animate__tada mb-4">
                        Login dulu ga sih
                    </span>

                    <ul class="wrapper" style="margin-left: 115px;">

                        <li style="--i:4;"><input class="input" type="email" v-model="email" placeholder="Email"
                                required=""></li>
                        <!-- <li style="--i:3;"><input class="input" placeholder="Phone number" required="" name="phone"></li> -->
                        <li style="--i:2;"><input class="input" type="password" v-model="password" placeholder="Password"
                                required="" name="email">
                        </li>
                        <button class="button_login" style="--i:1;">Submit</button>
                    </ul>

                    <div class="w-full text-center p-t-55">
                        <span class="txt2">
                            Not a member?
                        </span>

                        <router-link to="/signup" class="txt2 bo1">
                            Sign up now
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <!-- partial:index.partial.html -->
    <!-- <div class="container" onclick="onclick">
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="center">
                <h2>Please Sign In</h2>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <h2>&nbsp;</h2>
            </div>
        </div> -->
    <!-- partial -->
</template>
    
<style>
/* you can choose any color you want. don't be afraid to experiment  */

.input,
.button_login {
    width: 100%;
    height: 40px;
    position: relative;
    padding: 10px;
    border: 0.1px solid #575cb5;
}

.button_login {
    background: #6d74e3;
    border: none;
}

.wrapper {
    position: relative;
    transform: skewY(-14deg);
}

.wrapper li,
.button_login {
    position: relative;
    list-style: none;
    width: 200px;
    z-index: var(--i);
    transition: 0.3s;
    color: white;
}

.wrapper li::before,
.button_login::before {
    position: absolute;
    content: '';
    background: #6d74e3;
    top: 0;
    left: -40px;
    width: 40px;
    height: 40px;
    transform-origin: right;
    transform: skewY(45deg);
    transition: 0.3s;
}

.wrapper li::after,
.button_login::after {
    position: absolute;
    content: '';
    background: #6d74e3;
    width: 200px;
    height: 40px;
    top: -40px;
    left: 0;
    transform-origin: bottom;
    transform: skewX(45deg);
    transition: 0.3s;
}

.wrapper li:nth-child(1)::after,
.wrapper li:nth-child(1)::before {
    background-color: #d8daf7;
}

.wrapper li:nth-child(2)::after,
.wrapper li:nth-child(2)::before {
    background-color: #c2c5f3;
}

.wrapper li:nth-child(3)::after,
.wrapper li:nth-child(3)::before {
    background-color: #989deb;
}

li .input {
    outline: none;
    border: none;
    color: black;
}

li .input::placeholder {
    color: black;
}

li:nth-child(1) .input {
    background: #d8daf7;
}

li:nth-child(2) .input {
    background: #c2c5f3;
}

li:nth-child(3) .input {
    background: #989deb;
}


li:nth-child(1) .input:focus {
    outline: none;
    border: 3.5px solid #d8daf7;
}

li:nth-child(2) .input:focus {
    outline: none;
    border: 3.5px solid #c2c5f3;
}

li:nth-child(3) .input:focus {
    outline: none;
    border: 3.5px solid #989deb;
}

.wrapper li:hover,
.button_login:hover {
    transform: translateX(-20px);
}

.button_login:hover,
.button_login:hover::before,
.button_login:hover::after {
    background: #575cb5;
}

.button_login:active {
    transform: translateX(0px);
}







/* button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 10px;
    color: white;
    text-shadow: 2px 2px rgb(116, 116, 116);
    text-transform: uppercase;
    border: solid 2px black;
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 17px;
    background-color: hsl(49deg 98% 60%);
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    transition: all .5s ease;
}

button:active {
    transform: scale(.9);
    transition: all 100ms ease;
}

button svg {
    transition: all .5s ease;
    z-index: 2;
}

.play {
    transition: all .5s ease;
    transition-delay: 300ms;
}

button:hover svg {
    transform: scale(3) translate(50%);
}

.now {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    transition: all .5s ease;
    z-index: 2;
}

button:hover .now {
    transform: translateX(10px);
    transition-delay: 300ms;
}

button:hover .play {
    transform: translateX(200%);
    transition-delay: 300ms;
} */
</style>

<script>
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'
// import 'animate.css'

Vue.use(axios)

export default {
    data() {
        return {
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
                        // localStorage('setToken', response.data.token)
                        location.href = '/'

                    }
                )
                .catch(
                    (err) => {
                        console.log(err)
                        console.log("Password salah")
                        swal('Email atau password salah', {
                            icon: 'error'
                        })
                    }
                )
        }
    },
    mounted() {
        // this.$emit('aunthenticated', false)
    }
}
</script>