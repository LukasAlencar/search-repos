'use client'

import { User } from "@/types/user"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export const HeroSection = ({ user }: User) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: .5 }}
            className="flex-1 h-auto m-6 flex justify-around flex-col xl:flex-row space-y-5"
        >
            <div className="flex h-60 sm:space-x-6 space-x-2 items-center justify-center ">
                <Image
                    src={user.avatar_url ? user.avatar_url : ''}
                    width={250}
                    height={250}
                    alt="User Image"
                    className="rounded-full xl:ml-10 w-36 md:w-60"
                />
                <div className="space-y-2">
                    <motion.h1
                        className="md:text-3xl">
                        {user.name}
                    </motion.h1>
                    <motion.span
                    >
                        <Link target="_blank" href={`https://github.com/${user.login}`} className="text-sm md:text-xl text-slate-500">@{user.login}</Link>
                    </motion.span>
                    <p className="text-sm md:text-xl text-slate-100 xsm:max-w-60 sm:max-w-80 max-w-40 line-clamp-4">{user.bio}</p>
                </div>
            </div>
            <div className="flex space-x-6 items-center justify-center">
                <div className="sm:w-full flex justify-center" dangerouslySetInnerHTML={{ __html: `<img style="width: 97%" src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&count_private=true&theme=radical&include_all_commits=true&custom_title=GitHub%20Stats" alt="GitHub Stats" />` }} />
            </div>

        </motion.div>
    )
}