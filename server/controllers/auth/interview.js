import dotenv from 'dotenv'
dotenv.config()

import OpenAI from 'openai'
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
console.log(GEMINI_API_KEY)
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

export async function liveInterview(req,res){

    const body = req.body
    if(!body){
        res.status(401).json({message : "No prompt Provided"})
    }
try{
    // Open AI Integration
        // const client = new OpenAI({  
        //     apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
        // });


        // console.log(body.prompt, 'prompt')
        // const response = await client.responses.create({
        //     model: 'gpt-5.5',
        //     input: body.prompt
        // });

    const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: body.prompt,
  });
  console.log(response.text);

        console.log(response)

        res.status(200).json({ message: "ok", data: response.text })

}catch(err){
    res.status(500).json({message :err.message})
}

}