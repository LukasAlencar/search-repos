'use client'

import { useState } from "react"
import { Header } from "./header"
import { Main } from "./main"
import axios from "axios"
import { UserState } from "@/types/user"

export const Section = () => {

    const [user, setUser] = useState<UserState>()

    const handleSearch = async (name: string) => {
        var nameAux = ''
        await axios
            .get(`https://api.github.com/users/${name}`)
            .then(res => {
                const { name, avatar_url, bio, login } = res.data
                setUser(
                    {
                        name,
                        avatar_url,
                        bio,
                        login,
                    } as UserState
                )
                nameAux = name;
            })
            .catch(err => console.log(err))

        axios
        .get(`https://api.github.com/users/${name}/repos`)
        .then(res => {
            setUser(prev => ({...prev, repos: res.data} as UserState))
            // console.log(res.data)
            // console.log(id, name, description, html_url, stargazers_count, watchers_count, forks_count);
        })
    }

    return (
        <div className="w-11/12 h-5/6 bg-slate-800 rounded-xl overflow-hidden flex flex-col overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm">
            <Header handleSearch={(data) => handleSearch(data.username)} />
            {user && <Main user={user} />}
        </div>
    )
}