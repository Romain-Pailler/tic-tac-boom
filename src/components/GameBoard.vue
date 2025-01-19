<template>
    <div class="board">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
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
        board: Array,
        currentPlayer: String,
        userId: String,
    },
    methods: {
        canPlay(row, col) {
            return !this.board[row][col] && this.currentPlayer === this.userId;
        },
        play(row, col) {
            if (this.canPlay(row, col)) {
                this.$emit('play', { row, col });
            }
        },
    },
};
</script>

<style>
.board {
    display: grid;
    gap: 10px;
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
    cursor: pointer;
}
.cell.clickable {
    background-color: lightblue;
    cursor: pointer;
}
</style>
