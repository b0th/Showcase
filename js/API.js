class Github {
    constructor(Username) {
        this.username = Username;
        this.reposUrl = `https://api.github.com/users/${this.username}/repos`;
        this.repos = [];
    }

    async getRepos () {
        // Simple GET request to get repos
        return await fetch(this.reposUrl, {
            method: 'GET',
        })
            .then(res => res.json())
    }

    async parseLastCommits (repos) {
        // Call func -> GET
        this.repos = await this.getRepos();
        this.repos = this.repos.filter(repo => repo.fork == false).slice(-1 * repos)
    }
}