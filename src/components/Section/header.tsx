'use client'

import { FaGithub } from "react-icons/fa"
import { HiOutlineSearchCircle } from "react-icons/hi"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const searchUserSchema = z.object({
    username: z.string({
        required_error: "Username é obrigatório!"
    }).min(1, 'Username é obrigatório!').toLowerCase().trim().transform(data => data.replace(/\s/g, ''))
})

type searchUserProps = z.infer<typeof searchUserSchema>

type HeaderProps = {
    handleSearch: (data:{username:string}) => void
}

export const Header = ({handleSearch}:HeaderProps) => {


    const { register, formState: { errors }, handleSubmit } = useForm<searchUserProps>({
        resolver: zodResolver(searchUserSchema),
    })

    return (
        <header className="p-4 bg-slate-950 flex space-y-4 md:space-y-0 md:flex-row flex-col md:justify-between items-center w-full">
            <div className="flex space-x-2 items-center">
                <span>
                    <FaGithub
                        size={25}
                    />
                </span>
                <span>
                    Search repositories by username
                </span>
            </div>
            <div className="flex space-x-2 items-center">
                <div>
                    {errors.username && <span className="text-red-600">{errors.username.message}</span>}
                    <form 
                        onSubmit={handleSubmit((data) => handleSearch(data))}
                        className="flex space-x-2 items-center">
                        <Input
                            placeholder="Username"
                            className="bg-slate-800 text-slate-50 border-none focus-visible:ring-offset-1"
                            {...register("username")}
                        />
                        <Button variant={'default'}
                            type="submit"
                        >
                            <HiOutlineSearchCircle
                                size={25}
                            />
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    )
}