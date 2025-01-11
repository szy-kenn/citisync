import { TopBar } from "./components/top-bar"
import BottomBar  from "./components/bottom-bar"
import { Toaster } from "sonner"

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <TopBar />
            <div>
                {children}
            </div>
            <BottomBar />
            <Toaster />
        </div>
    )
}
