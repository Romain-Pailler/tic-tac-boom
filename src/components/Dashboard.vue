<template>
    <p>Bonjour, {{username}} </p>
</template>

<script>
import {getUserIdentity} from '@/services/AuthProvider.js'
export default {
        data() {
            return {
                username: getUserIdentity().username,
            }
        },
        methods: {
        }
    }
</script>