<template>
    <div class="board">
        
        <div v-if="!isYourTurn" class="error-message">{{ errorMessage }}</div>
        
        <div v-for="(row, rowIndex) in formattedBoard" :key="rowIndex" class="row">
            <div
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="cell"
                :class="{ clickable: canPlay(rowIndex, colIndex) }"
                @click="play(rowIndex, colIndex)"
            >
                {{ cell }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        board: {
            type: Array,
            required: true,
            validator(value) {
                return value.length === 3 && value.every(row => Array.isArray(row) && row.length === 3);
            },
        },
        currentPlayer: {
            type: String,
            required: true,
        },
        players: Object,
        isYourTurn:Boolean
    },
    data() {
        return {
            errorMessage: "Ce n'est pas votre tour, vous ne pouvez pas jouer.",
        };
    },
    computed: {
        formattedBoard() {
            return this.board.map(row =>
                row.map(cell => {
                    if (cell === this.players.player1.id) return "X";
                    if (cell === this.players.player2.id) return "O";
                    return "";
                })
            );
        },
    },
    methods: {
        canPlay(rowIndex, colIndex) {
            if (this.players.player2.username === "En attente...") {
                return false;
            }
            const isCurrentPlayerValid = this.currentPlayer === this.players.player1.id || this.currentPlayer === this.players.player2.id;
            return (
                !this.board[rowIndex][colIndex] && isCurrentPlayerValid
            );
        },
        play(rowIndex, colIndex) {
            if (this.canPlay(rowIndex, colIndex)) {
                this.$emit("play", { row: rowIndex, col: colIndex });
            } else {
                this.errorMessage = "Cette case est déjà occupée.";
            }
        },
    },
};
</script>

<style>
.error-message {
    color: red;
    font-weight: bold;
    margin-bottom: 10px;
}
.board {
    display: grid;
    gap: 5px;
}
.row {
    display: flex;
}
.cell {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    text-align: center;
    line-height: 50px;
    font-size: 1.5rem;
    cursor: default;
    background-color: white;
    color: black;
}
.cell.clickable {
    background-color: lightblue;
    cursor: pointer;
}
</style>
