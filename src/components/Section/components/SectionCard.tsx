'use client'
import { Repository } from "@/types/user"
import Link from "next/link"
import { RiGitRepositoryLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { ComponentProps, useState } from "react";
import copy from 'clipboard-copy';
import { motion } from "framer-motion"

type SectionCardProps = ComponentProps<typeof motion.div> & {
    repository: Repository
}

export const SectionCard = ({ repository, ...props}: SectionCardProps) => {

    const [httpsSelectedCopy, setHttpsSelectedCopy] = useState<boolean>(true)
    const [copied, setCopied] = useState<boolean>(false)

    const handleCopy = () => {
        if (httpsSelectedCopy) {
            copy(repository.clone_url)
        } else {
            copy(repository.ssh_url)
        }
        toggleCopyIcon()
    }

    const toggleCopyIcon = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <motion.div 
            {...props}
            className="w-11/12 bg-slate-900 rounded-lg h-72 flex p-6 items-start flex-col space-y-4 border-4 border-r-0 border-t-0 border-slate-950">
            <header className="flex sm:justify-between w-full flex-col sm:flex-row justify-center space-y-3 sm:space-y-0">
                <Link className="flex items-center justify-center sm:justify-normal space-x-2 hover:text-slate-200" href={repository.html_url} target="_blank">
                    <RiGitRepositoryLine size={30} />
                    <h1 className="text-xl font-bold">{repository.name}</h1>
                </Link>
                <div className="flex items-center space-x-2 justify-center sm:justify-normal">
                    {copied ?
                        <LuCopyCheck className="mr-2 cursor-pointer" size={20} />
                        :
                        <LuCopy onClick={handleCopy} className="mr-2 cursor-pointer" size={20} />
                    }
                    <div>
                        <span onClick={() => {
                            setHttpsSelectedCopy(true)
                        }} className={`cursor-pointer ${httpsSelectedCopy && 'border-b-2 border-b-blue-400'}`}>HTTPS</span>
                    </div>
                    <div>
                        <span onClick={() => setHttpsSelectedCopy(false)} className={`cursor-pointer ${!httpsSelectedCopy && 'border-b-2 border-b-blue-400'}`}>SSH</span>
                    </div>
                </div>
            </header>
            <main className="mb-auto flex-1 w-full">
                <p className="text-center overflow-y-auto line-clamp-5 pr-4 scrollbar-thin text-slate-400 scrollbar-thumb-slate-50 scrollbar-track-transparent scrollbar-thumb-rounded-md" title={repository.description}>
                    {repository.description}
                </p>
            </main>
            <footer className="flex w-full h-auto mt-auto flex-1 items-end">
                <div className="flex items-center space-x-5">
                    <div className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                        <CiStar size={25} />
                        <span className="text-slate-400">
                            {repository.stargazers_count}
                        </span>
                        <span className="hidden sm:inline text-slate-400">Stars</span>
                    </div>
                    <div className="text-sm font-medium text-slate-200  flex items-center space-x-2">
                        <GoRepoForked size={25} />
                        <span className="text-slate-400">
                            {repository.forks_count}
                        </span>
                        <span className="hidden sm:inline text-slate-400">Forks</span>
                    </div>
                    <div className="text-sm font-medium text-slate-200  flex items-center space-x-2">
                        <IoEyeOutline size={25} />
                        <span className="text-slate-400">
                            {repository.watchers_count}
                        </span>
                        <span className="hidden sm:inline text-slate-400">Watchers</span>
                    </div>
                </div>
            </footer>
            {/* <a href={repository.html_url} target="_blank" rel="noreferrer">
            </a>
            <div className="flex flex-col justify-center items-center">
                <a href={repository.html_url} target="_blank" rel="noreferrer">
                    <h2 className="text-xl font-bold text-gray-900">{repository.name}</h2>
                </a>
                <p className="text-gray-500 text-sm">{repository.description}</p>
            </div> */}
        </motion.div>
    )
}