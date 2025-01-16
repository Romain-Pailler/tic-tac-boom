<script setup>
import { isAuthenticated, removeToken } from '@/services/AuthProvider';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const isLogged = ref(isAuthenticated());

</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/login" v-if="!isLogged">Login</RouterLink>
        <RouterLink to="/register" v-if="!isLogged">Register</RouterLink>
        <RouterLink to="/dashboard" v-if="isLogged">Dashboard</RouterLink>
        <RouterLink to="/profil" v-if="isLogged">Profil</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

