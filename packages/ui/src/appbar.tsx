import { Button } from "./button";
import Link from "next/link";

interface AppbarProps {
    user?: string|null
    UserButton: any
}

export const Appbar = ({
    user,
    UserButton,
}: AppbarProps) => {
    return (
        <div className="bg-slate-400 border-b-2 border-white text-neutral-100 font-semibold ">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href={"/"} className="text-xl ml-4">My App</Link>
                <div>
                    {user ? (
                        <div>
                            <UserButton />
                        </div>
                    ) :(
                        <div className="gap-4 flex mx-5">
                            <Link href={"/sign-in"}>Login</Link>
                            <Link href={"/sign-up"}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
