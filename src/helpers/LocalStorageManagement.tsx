//This file should contain all local storage calls for the application
//Provides functions to store and retrieve data from local storage

export class Storage {
    static storeUser(id: string, token: string) {
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
    }

    static removeUser() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
    }

    static retrieveUser() {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        return { id, token };
    }
    
    //--------------------------------------------------------------
    static storeGameIdAndPlayerId(gameId: string, playerId: string) {
        localStorage.setItem("gameId", gameId);
        localStorage.setItem("playerId", playerId);
    }
    
    static removeGameIdAndPlayerId() {
        localStorage.removeItem("gameId");
        localStorage.removeItem("playerId");
    }
    
    static retrieveGameIdAndPlayerId() {
        const gameId = localStorage.getItem("gameId");
        const playerId = localStorage.getItem("playerId");
        return { gameId, playerId };
    }
}

