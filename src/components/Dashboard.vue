<template>
    <p>Bonjour, {{username}} !!!!</p>
    <div>
        <h1>Toutes les parties</h1>
        <div>
            <p v-if="allGames.length === 0">Pas de parties lancées</p>
            <ul>
                <li v-for="game in allGames" :key="game.id">
                    ID : {{game.id}} <br/> STATUS : {{game.status}}
                    <button @click="joinGames(game.id)">Join</button>
                    <button @click="deleteGames(game.id)">Delete</button>
                </li>
            </ul>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <div>
            <button @click="newGame">New Game</button>
            <button @click="fetchGames">Refresh</button>
        </div>
    </div>
</template>

<script>
import { getUserIdentity } from '@/services/AuthProvider.js';
import { createGames, deleteGames, getGames, getGamesById, joinGames } from '@/services/httpClient';
import { useRouter } from 'vue-router';

const router = useRouter();

export default {
    data() {
        return {
            username: '',
            allGames: [],
            errorMessage: '',  // Ajout d'un état pour le message d'erreur
        };
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
        async deleteGames(id) {
            try {
                const gameDetails = await getGamesById(id);
                // Vérifier si l'utilisateur connecté est le créateur de la partie
                if (gameDetails.player1 !== getUserIdentity().id) {
                    // Si ce n'est pas le créateur, afficher un message d'erreur
                    this.errorMessage = "Vous n'êtes pas le créateur de cette partie, impossible de la supprimer.";
                } else {
                    // Si c'est le créateur, procéder à la suppression
                    await deleteGames(id);
                    await this.fetchGames(); // Actualiser la liste des jeux
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de la partie:', error);
                this.errorMessage = "Une erreur est survenue lors de la suppression de la partie.";
            }
        },
        async joinGames(id) {
            try {
                const gameDetails = await getGamesById(id);
                if (gameDetails.player1 === getUserIdentity().id || gameDetails.player2 === getUserIdentity().id) {
                    this.$router.push({ name: 'Game', params: { id: id } });
                } else {
                    await joinGames(id);
                    this.$router.push({ name: 'Game', params: { id: id } });
                }
            } catch (error) {
                console.error('Erreur lors de la tentative de rejoindre la partie:', error);
            }
        }
    }
};
</script>

<style>
.error-message {
    color: red;
    font-weight: bold;
    margin-top: 20px;
}
</style>
