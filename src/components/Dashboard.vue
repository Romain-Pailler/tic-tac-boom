<template>
    <p>Bonjour, {{username}} !!!!</p>
    <div>
        <h1>Toutes les parties</h1>
        <div>
            <p v-if="allGames.length === 0">Pas de parties lancés</p>
            <ul>
                <li v-for="game in this.allGames" :key="game.id">ID : {{game.id}} <br/> STATUS : {{game.status}} <button @click="this.joinGames(game.id)">Join</button> <button @click="deleteGames(game.id)">Delete</button></li>
            </ul>
        </div>
        <div>
            <button @click="newGame">Créer une partie</button>
        </div>
    </div>
</template>

<script>
import { getUserIdentity } from '@/services/AuthProvider.js';
import { createGames, deleteGames, getGames, joinGames, getGamesById} from '@/services/httpClient';
import { useRouter } from 'vue-router';
const router = useRouter();
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
        },
        async joinGames(id){
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
}
</script>