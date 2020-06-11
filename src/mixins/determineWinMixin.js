export default {
    methods: {
        determineWin: function(playedGame) {
            switch(playedGame.role.type) {
            case 'JAILOR':
                /* falls through */
            case 'TOWN_INVESTIGATIVE':
                /* falls through */
            case 'TOWN_KILLING':
                /* falls through */
            case 'TOWN_PROTECTIVE':
                /* falls through */
            case 'TOWN_SUPPORT':
                /* falls through */
                return playedGame.game.winner == "TOWN"
            case 'GODFATHER':
                /* falls through */
            case 'MAFIOSO':
                /* falls through */
            case 'RANDOM_MAFIA':
                /* falls through */
                return playedGame.game.winner == "MAFIA"
            case 'NEUTRAL_EVIL':
                return playedGame.game.neWin;
            case 'NEUTRAL_KILLING':
                return playedGame.game.winner == "NK"
            }
            return false
        }
    }
}