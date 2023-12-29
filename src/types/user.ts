export type User = {
    user: {
        name: string | undefined,
        bio: string | undefined,
        avatar_url: string | undefined,
        login: string | undefined,
        repos: [Repository]
    }
}

export type UserState = {
    name: string | undefined,
    bio: string | undefined,
    avatar_url: string | undefined,
    login: string | undefined,
    repos: [Repository]
}

export type Repository =
    {
        id: number,
        name: string,
        description: string,
        html_url: string,
        stargazers_count: number,
        watchers_count: number,
        forks_count: number,
        ssh_url: string,
        clone_url: string,
    }