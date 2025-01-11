import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function IDupload() {

    return (
        <Card className='py-8 flex flex-col px-5 gap-8'>
            <h4 className='text-center text-gray-400 w-[400px]'>Do you have a senior citizen, PWD, or special needs 
                card for discounts or assistance?
            </h4>
            <div className="flex justify-center">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='None'>None</SelectItem>
                            <SelectItem value='Senior Citizen'>Senior Citizen</SelectItem>
                            <SelectItem value='PWD'>PWD</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2 w-[400px]">
                <Checkbox id="terms" />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    By uploading your ID, you agree to our privacy policy and consent to the verification process. Your information will be kept confidential and used solely for eligibility purposes.
                </label>
            </div>
            <div className="flex justify-center">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Upload File" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='None'>None</SelectItem>
                            <SelectItem value='Senior Citizen'>Senior Citizen</SelectItem>
                            <SelectItem value='PWD'>PWD</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </Card>
    )
}