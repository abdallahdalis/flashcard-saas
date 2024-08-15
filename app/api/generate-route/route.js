import { NextResponse } from 'next/server'
import Groq from "groq-sdk";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY})
    const {text} = await req.json()
  

    const completion = await groq.chat.completions.create({
    messages: [
      {role: "system", content: systemPrompt },
      { role: 'user', content: text },
    ],
    model: "llama3-8b-8192",
    response_format: { type: 'json_object' },
  });
  
    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }