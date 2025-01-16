<template>
    <div>
      <h1>Profil de {{ user.username }}</h1>
      <form @submit.prevent="saveProfile">
        <div v-if="editing">
          <label for="name">Nom actuel</label>
          <input id="name" v-model="user.username" type="text" />
        </div>
        <div v-else>
          <p>Nom actuel : {{ user.username }}</p>
        </div>
        <div v-if="editing">
          <label for="password">Mot de passe :</label>
          <input id="password" v-model="user.password" type="password" />
        </div>
        <button type="submit" v-if="editing">Enregistrer</button>
        <button type="button" @click="toggleEdit">{{ editing ? 'Annuler' : 'Modifier' }}</button>
      </form>
      <button v-if="isLogged" @click="handleLogOut()">Deconnexion</button>
    </div>
  </template>


<script setup>
import { isAuthenticated, removeToken } from '@/services/AuthProvider';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();


const isLogged = ref(isAuthenticated());

const handleLogOut = () => {
  removeToken(); 
  isLogged.value = false;
  router.push('/login'); 
};

</script>

<script>

import{getUser, updateUser} from '@/services/httpClient.js';
import { getUserIdentity } from '@/services/AuthProvider';

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      editing: false,
    };
  },
  async created() {
    const userID = getUserIdentity().id;
      if (!userID) {
        throw new Error('ID utilisateur introuvable');
      }
      const user = await getUser(userID);
      if (user) {
      this.user = { ...user };
    } else {
      throw new Error('Utilisateur introuvable');
    }
  },
  methods: {
    async saveProfile() {
      const updatedUser = await updateUser(this.user.username, this.user.password);
      this.user = updatedUser;
      this.editing =false;
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    
}
}

</script>