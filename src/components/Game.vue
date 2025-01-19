<template>
    <div>
        <h1>Tic Tac Toe</h1>
        <!-- Composant player-info -->
        <player-info 
            :playerNames="playerNames" 
            :currentPlayer="currentPlayer" 
            :waitingPlayer="!gameState?.player2" 
        />
        <!-- Composant game-board -->
        <game-board 
            :board="board" 
            :currentPlayer="currentPlayer" 
            :userId="userId" 
            @play="handlePlay" 
        />
        <!-- Affichage du gagnant  -->
        <p v-if="winner">Le gagnant est : {{ winner }}</p>
        <!-- Message d'erreur si une erreur survient -->
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';
import PlayerInfo from '@/components/PlayerInfo.vue';
import { fetchGameDetails, playMove } from '@/services/httpClient.js';

export default {
    components: { PlayerInfo, GameBoard },
    data() {
        return {
            gameId: null,
            gameState: null,
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            currentPlayer: null, 
            winner: null,
            error: null,
            userId: "votre-id-utilisateur",
            polling: null,
            playerNames: {
                player1: null,
                player2: null,
            },
        };
    },
    async created() {
        this.gameId = this.$route.params.id; 
        await this.fetchGameState(); 
        this.startPolling();
    },
    beforeUnmount() {
        this.stopPolling();
    },
    methods: {
        async fetchGameState() {
            try {
                const game = await fetchGameDetails(this.gameId);
                this.gameState = game;
                this.currentPlayer = game.currentPlayer;
                this.board = this.formatBoard(game.board);
                this.winner = game.status === 'finished' ? this.getWinner(game.board) : null;
                this.playerNames = {
                    player1: game.player1,
                    player2: game.player2 || "En attente...",
                };
            } catch (error) {
                this.error = 'Erreur lors de la récupération des données.';
                console.error(error);
            }
        },
        formatBoard(flatBoard) {
            return [
                [flatBoard[0], flatBoard[1], flatBoard[2]],
                [flatBoard[3], flatBoard[4], flatBoard[5]],
                [flatBoard[6], flatBoard[7], flatBoard[8]],
            ];
        },
        getWinner(board) {
            return null;
        },
        async handlePlay(position) {
            if (this.currentPlayer !== this.userId || this.winner) return;
            try {
                await playMove(this.gameId, position.row, position.col); 
                await this.fetchGameState();
            } catch (error) {
                console.error('Erreur lors du jeu :', error);
            }
        },
        startPolling() {
            if (this.polling) return;
            this.polling = setInterval(this.fetchGameState, 10000);
        },
        stopPolling() {
            if (this.polling) {
                clearInterval(this.polling);
                this.polling = null;
            }
        },
    },
};
</script>

<style>
.error {
    color: red;
    font-weight: bold;
}
</style>
