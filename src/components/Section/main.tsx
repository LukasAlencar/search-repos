'use client'

import { HeroSection } from "./components/HeroSection"
import { SectionCard } from "./components/SectionCard"
import { User } from "@/types/user"

export const Main = ({ user }: User) => {

    return (
        <div className="py-4">
            <HeroSection user={user} />
            <main className="flex-1 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(700px,1fr))] flex flex-col gap-3 lg:justify-items-center items-center">
                {user?.repos?.map((repo, i) => (
                    <SectionCard 
                        initial={{opacity: 0, scale: 0}}
                        whileInView={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        transition={{duration: .5, delay: .1 * i * .1}}
                        key={repo.id} 
                        repository={repo} />
                ))}
            </main>
        </div>
    )
}