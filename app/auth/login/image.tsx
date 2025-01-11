'use client';
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function Login() {

    const [file, setFile] = useState<File>();
    const supabase = createClient("https://vsbkxysdsqapomfudqih.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ACCESS_KEY!)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files![0]
        setFile(selectedFile)
      }

    // Upload file using standard upload
    async function uploadFile() {

        console.log(process.env.NEXT_PUBLIC_SUPABASE_ACCESS_KEY)

        if (!file) {
            return;
        }
        try {
            const { data, error } = await supabase.storage.from('chataptptpt').upload('1.png', file, {
                contentType: 'image/jpeg',
            });
            console.log(data);
            console.log(error);
        } catch (error) { 
            console.log("Error : ", error);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <h1>Log In</h1>
            {/* <form>
                <Input placeholder="Email or Phone Number"></Input>
                <Input placeholder="Enter your Password"></Input>
            </form> */}
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <button onClick={uploadFile}>submit</button>
        </div>
    )
}