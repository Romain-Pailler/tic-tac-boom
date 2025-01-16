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

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/login" v-if="!isLogged">Login</RouterLink>
        <RouterLink to="/register" v-if="!isLogged">Register</RouterLink>
        <RouterLink to="/dashboard" v-if="isLogged">Dashboard</RouterLink>
        <RouterLink to="/profil" v-if="isLogged">Profil</RouterLink>
        <button v-if="isLogged" @click="handleLogOut()">Deconnexion</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

