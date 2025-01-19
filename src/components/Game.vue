<template>
    <div>
        <h1>Détails de la partie</h1>
        <p>ID du jeu : {{ gameId }}</p>
        </div>
</template>

<script>
export default {
    data() {
        return {
            gameId: null,
        };
    },
    mounted() {
        this.gameId = this.$route.params.id;

        // Optionnel : récupérer les détails du jeu depuis l'API
        // Exemple :
        // this.fetchGameDetails(this.gameId);
    },
    methods: {
        async fetchGameDetails(id) {
            try {
                const gameDetails = await getGameDetails(id);
                console.log(gameDetails);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du jeu:', error);
            }
        },
    },
};
</script>
