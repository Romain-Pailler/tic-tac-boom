<template>
    <div>
      <h1>Mon Profil</h1>
      <form @submit.prevent="saveProfile">
        <div>
          <label for="name">Nom</label>
          <input id="name" v-model="user.name" type="text" />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      <button @click="logout">Se déconnecter</button>
    </div>
  </template>

<script>

import{getUser, updateUser} from '@/services/httpClient.js';
import { getUserIdentity } from '@/services/AuthProvider';

export default {
  data() {
    return {
      user: {
        name: '',
      },
    };
  },
  async created() {
    const userID = getUserIdentity().id;
      if (!userID) {
        throw new Error('ID utilisateur introuvable');
      }
      const user = await getUser(userID);
      this.user = user;
  },
  methods: {
    async saveProfile() {
      const updatedUser = await updateUser(this.user);
      this.user = updatedUser;
      this.$router.push('/');
    },
}
}

</script>