import { BsBarChart, BsHouseDoor, BsExclamationSquare  } from "react-icons/bs";
import { HiOutlineHand, HiScale } from "react-icons/hi";


export default function BottomBar() {

    return (
        <div className="fixed bottom-0 left-0 w-full h-14 bg-white px-12">
            <div className="flex justify-between items-center h-full text-2xl text-slate-400 gap-12">
                    <div className="flex flex-col items-center max-w-12">
                        <BsHouseDoor />
                    </div>
                    <div className="flex flex-col items-center max-w-12">
                        <BsBarChart />
                    </div>

                <div className="w-fit">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-7 bg-[#C1C2D2] px-2 py-2 rounded-full">
                        <div className="text-2xl bg-gradient-to-b from-[#2F3269] to-[#5D63CF] h-14 text-white aspect-square rounded-full">
                            <div className="flex justify-center items-center h-full">
                                <BsExclamationSquare />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="flex flex-col items-center max-w-12">
                        <HiOutlineHand />
                    </div>
                    <div className="flex flex-col items-center max-w-12">
                        <HiScale />
                    </div>
            </div>
        </div>
    )
}