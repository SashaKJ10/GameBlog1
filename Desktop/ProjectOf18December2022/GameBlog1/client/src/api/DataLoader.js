export const getGameById = (id) => {
    return new Promise((resolve, reject) => {
        getAllGames().then(result => {
            try {
                let game = result.find(game => game.id == id);
                if (game == null) {
                    reject('Game is not found');
                } else {
                    resolve(game);
                }
            } catch (ex) {
                reject(ex);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export const getAllGames = () => {
    return new Promise((resolve, reject) => {
        try {
            let games = JSON.parse(localStorage.getItem('items') ?? '[]');
            resolve(games);
        } catch (ex) {
            reject(ex);
        }
    });
}
