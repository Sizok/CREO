class userStorage {
    constructor(user) {
        this.user = user;
    }

    setUser(user){
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}

module.exports = userStorage;