<template>
    <div>
        <p>Joueur 1 : {{ playerNames.player1 }}</p>
        <p v-if="playerNames.player2">Joueur 2 : {{ playerNames.player2 }}</p>
        <p v-else>En attente d'un joueur...</p>
        <p>Au tour de : {{ currentPlayerName }}</p>
    </div>
</template>

<script>
export default {
    props: {
        playerNames: Object,
        currentPlayer: String,
        waitingPlayer: Boolean,
    },
    computed: {
        currentPlayerName() {
            return this.currentPlayer === this.playerNames.player1
                ? 'Joueur 1'
                : 'Joueur 2';
        },
    },
};
</script>
