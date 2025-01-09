<template>
     <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          v-model="this.username"
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          v-model="this.password"
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div>
        <label for="confirmPassword">Confirmez le mot de passe :</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirmez votre mot de passe"
        />
      </div>
      <button type="submit">S'inscrire</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { register } from '@/services/httpClient.js';
    export default{
        data(){
            return{
                username:"",
                password:"",
                confirmPassword:"",
                error:null,
            };
        },
        methods: {

            async handleRegister(){
                if(this.password !== this.confirmPassword){
                    this.error = "Les mots de passe ne sont pas les mêmes";
                    return;
                }

                try{

                    console.log(password);
                    await register(this.username, this.password);
                    this.$router.push("/login");
                }catch(error){
                    this.error = "Erreur lors de l'inscription";
                }
            },
        },
    };

</script>