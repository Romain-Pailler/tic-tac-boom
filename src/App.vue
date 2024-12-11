<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

