'use client';
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Login() {

    const [file, setFile] = useState<File>();

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
            <h1>Image Upload</h1>
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <button onClick={uploadFile}>submit</button>
        </div>
    )
}