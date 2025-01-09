<script>
import { setToken } from '@/services/AuthProvider.js';
import { login } from '@/services/httpClient.js';
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: null
            }
        },
        methods: {
            async handleLogin(){
                try {
                    const token = await login(this.username,this.password)
                    setToken(token)
                } catch (err) {
                    console.log(err)
                    this.error = err.message || "Une erreur s'est produite lors de la connexion."
                }
            }
        }
    }
</script>

<template>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Ecrivez votre nom d'utilisateur">
        <input type="password" v-model="password" placeholder="Ecrivez votre mot de passe">
        <button type="submit">Connexion</button>
    </form>
    <p v-if="error">{{this.error}}</p>
</template>