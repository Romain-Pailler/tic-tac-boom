<template>
    <p>Bonjour, {{username}} !!!!</p>
    <div>
        <h1>Toutes les parties</h1>
        <div>
            <p v-if="allGames.length === 0">Pas de parties lancés</p>
            <ul>
                <li v-for="game in this.allGames" :key="game.id">{{game.id}} <button @click="deleteGames(game.id)"> Delete</button></li>
            </ul>
        </div>
        <div>
            <button @click="newGame">Créer une partie</button>
        </div>
    </div>
</template>

<script>
import { getUserIdentity } from '@/services/AuthProvider.js';
import { createGames, deleteGames, getGames } from '@/services/httpClient';
export default {
        data() {
            return {
                username: '',
                allGames: []
            }
        },
        async mounted() {
            this.username = getUserIdentity().username;
            await this.fetchGames();
        },
        methods: {
            async fetchGames() {
            try {
                const games = await getGames();
                this.allGames = games;
            } catch (error) {
                console.error('Erreur lors de la récupération des parties:', error);
            }
        },
            async newGame() {
            try {
                await createGames();
                await this.fetchGames(); 
            } catch (error) {
                console.error('Erreur lors de la création de la partie:', error);
            }
        },
        async deleteGames(id){
            await deleteGames(id);
            await this.fetchGames();
        }
    }
}
</script>