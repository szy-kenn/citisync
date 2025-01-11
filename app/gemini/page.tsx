"use client";
import React, { useRef, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const page = () => {
  
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = useRef(model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      }
    }));
    
    const handleClick = async () => {
      const result = await chat.current.sendMessage(prompt);
      setResult(result.response.text());
    }

    return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col p-4 gap-8 w-96'>
          <div className='flex gap-4 border border-gray-200 rounded-[999px] px-6 py-3 text-sm justify-between'>
            <input type="text" onChange={(e) => setPrompt(e.target.value)} className='border-none outline-none p-2 text-sm' value={prompt} placeholder='Enter your prompt here' />
            <button onClick={handleClick}>Submit</button>
          </div>
          <div>
              <p className='font-bold'>Gemini: </p>
              <textarea value={result } className='border-none outline-none w-full h-40' readOnly/>
          </div>
        </div>
    </div>
  )
}

export default page