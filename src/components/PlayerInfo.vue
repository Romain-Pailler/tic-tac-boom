<template>
    <div>
        <p>Joueur 1 : {{ playerNames.player1.username }} (X)</p>
        <p v-if="playerNames.player2">Joueur 2 : {{ playerNames.player2.username }} (O)</p>
        <p v-else>En attente d'un joueur...</p>
        <p v-if="!winner">Au tour de : {{ currentPlayerName }}</p>
        <p v-if="winner">Le gagnant est : {{ winner }}</p>
    </div>
</template>

<script>

export default {
    props: {
        playerNames: Object,
        currentPlayer: String,
        waitingPlayer: Boolean,
        winner:String
    },
    computed: {
        currentPlayerName() {
            return this.currentPlayer === this.playerNames.player1.id
                ? this.playerNames.player1.username
                : this.playerNames.player2.username;
        }
    },
};
</script>
