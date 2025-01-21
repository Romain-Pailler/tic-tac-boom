// game.vue
<template>
    <div>
        <h1>Tic Tac Toe</h1>
        <!-- Composant player-info -->
        <player-info 
            :playerNames="players" 
            :currentPlayer="currentPlayer" 
            :waitingPlayer="!gameState?.player2"
            :winner="winner"
        />
        <div v-if="isLoading">Chargement...</div>
        <game-board 
            v-else-if="board && Array.isArray(board) && board.length === 3" 
            :board="board" 
            :currentPlayer="currentPlayer" 
            :players="players"
            :isYourTurn="canPlay"
            @play="handlePlay" 
        />
        <!-- Message d'erreur si une erreur survient -->
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';
import PlayerInfo from '@/components/PlayerInfo.vue';
import { fetchGameDetails, getUser, playMove } from '@/services/httpClient.js';

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
            players: {
                player1: {id:null,username:null},
                player2: {id:null,username:null},
            },
            canPlay:true
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

                this.gameState = game;
                this.currentPlayer = game.currentPlayer;

                const newBoard = this.formatBoard(game.board);
                if (newBoard && newBoard.length === 3) {
                    this.board = newBoard;  
                } else {
                    console.warn("Données de tableau invalides :", game.board);
                }

                this.winner = game.winner;
                this.players.player1.id = game.player1;

                this.players.player2.id = game.player2 || undefined;
                this.getPlayersNames();
                if (this.isBoardFull() && !this.winner) {
                    this.winner = "Égalité";
                }

                if (this.winner) {
                    this.stopPolling();
                }
            } catch (error) {
                this.error = 'Erreur lors de la récupération des données.';
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        async getPlayersNames(){
            const player1 = await getUser(this.players.player1.id);
            this.players.player1.username = player1.username;
            if (this.players.player2.id) {
                const player2 = await getUser(this.players.player2.id);
                this.players.player2.username = player2.username;   
            }else{
                this.players.player2.username = "En attente...";
            }
        },
        formatBoard(flatBoard) {
            return [
                [flatBoard[0], flatBoard[1], flatBoard[2]],
                [flatBoard[3], flatBoard[4], flatBoard[5]],
                [flatBoard[6], flatBoard[7], flatBoard[8]],
            ];
        },
        async handlePlay(position) {
            if (this.winner || this.isLoading) return;

            this.isLoading = true;
            try {
                await playMove(this.gameId, position.row, position.col); 
                await this.fetchGameState();
                this.canPlay = true;
            } catch (error) {
                this.canPlay = false;
            } finally {
                this.isLoading = false;
            }
        },
        startPolling() {
            if (this.polling) return;
            this.polling = setInterval(this.fetchGameState, 5000);
        },
        stopPolling() {
            if (this.polling) {
                clearInterval(this.polling);
                this.polling = null;
            }
        },

        isBoardFull() {
            return this.board.every(row => row.every(cell => cell !== null));
        }
    },
};
</script>
