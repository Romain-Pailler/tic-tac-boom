<template>
    <div>
        <h1>Détails de la partie</h1>
        <p>ID du jeu : {{ gameId }}</p>
        <!-- Ajoute d'autres détails du jeu si besoin -->
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
        // Récupération de l'ID depuis les paramètres de la route
        this.gameId = this.$route.params.id;

        // Optionnel : récupérer les détails du jeu depuis l'API
        // Exemple :
        // this.fetchGameDetails(this.gameId);
    },
    methods: {
        async fetchGameDetails(id) {
            try {
                const gameDetails = await getGameDetails(id); // Implémente getGameDetails dans ton service
                console.log(gameDetails);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du jeu:', error);
            }
        },
    },
};
</script>
