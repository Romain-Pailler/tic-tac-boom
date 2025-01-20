// game.vue
<template>
    <div>
        <h1>Tic Tac Toe</h1>
        <!-- Composant player-info -->
        <player-info 
            :playerNames="playerNames" 
            :currentPlayer="currentPlayer" 
            :waitingPlayer="!gameState?.player2" 
        />
        <div v-if="isLoading">Chargement...</div>
        <game-board 
            v-else-if="board && Array.isArray(board) && board.length === 3" 
            :board="board" 
            :currentPlayer="currentPlayer" 
            @play="handlePlay" 
        />
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
            isLoading: false,
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
            this.isLoading = true;
            try {
                const game = await fetchGameDetails(this.gameId);
                console.log("Données du jeu récupérées :", game);

                this.gameState = game;
                this.currentPlayer = game.currentPlayer;

                const newBoard = this.formatBoard(game.board);
                if (newBoard && newBoard.length === 3) {
                    this.board = newBoard;
                } else {
                    console.warn("Données de tableau invalides :", game.board);
                }

                this.winner = game.status === 'finished' ? this.getWinner(game.board) : null;
                this.playerNames = {
                    player1: game.player1,
                    player2: game.player2 || "En attente...",
                };
            } catch (error) {
                this.error = 'Erreur lors de la récupération des données.';
                console.error(error);
            } finally {
                this.isLoading = false;
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
            // Implémentez la logique pour vérifier le gagnant.
            return null;
        },
        async handlePlay(position) {
            if (this.winner || this.isLoading) return;

            this.isLoading = true;
            try {
                await playMove(this.gameId, position.row, position.col); 
                await this.fetchGameState();
            } catch (error) {
                console.error('Erreur lors du jeu :', error);
            } finally {
                this.isLoading = false;
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
