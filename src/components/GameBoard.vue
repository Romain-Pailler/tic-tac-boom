<template>
    <div class="board">
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
    },
    computed: {
        /**
         * Transforme les valeurs du board pour afficher "X" ou "O" au lieu des IDs.
         * @returns {Array} Le tableau formaté.
         */
        formattedBoard() {
            return this.board.map(row =>
                row.map(cell => {
                    if (cell === "player1") return "X";
                    if (cell === "player2") return "O";
                    return "";
                })
            );
        },
    },
    methods: {
        /**
         * Vérifie si un joueur peut jouer à une position donnée.
         * @param {number} rowIndex - Index de la ligne.
         * @param {number} colIndex - Index de la colonne.
         * @returns {boolean} - True si la case est jouable, sinon false.
         */
        canPlay(rowIndex, colIndex) {
            return (
                !this.board[rowIndex][colIndex] && this.currentPlayer // Case vide et joueur valide
            );
        },
        /**
         * Gestion du clic sur une case.
         * @param {number} rowIndex - Index de la ligne.
         * @param {number} colIndex - Index de la colonne.
         */
        play(rowIndex, colIndex) {
            console.log("Clic détecté sur la case :", { rowIndex, colIndex });
            if (this.canPlay(rowIndex, colIndex)) {
                console.log("Case jouable, émission de l'événement.");
                this.$emit("play", { row: rowIndex, col: colIndex });
            } else {
                console.log("Case non jouable ou clic ignoré.");
            }
        },
    },
};
</script>

<style>
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
}
.cell.clickable {
    background-color: lightblue;
    cursor: pointer;
}
</style>
