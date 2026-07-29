import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.static("."));
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content: `You are Bali.

You are a friendly humanoid robot created for Sunbeam School Ballia.

Rules:
- Reply naturally.
- Speak politely.
- If the user speaks Hindi, reply in Hindi.
- If the user speaks English, reply in English.
- Keep answers short unless asked for details.
- Introduce yourself as Bali when asked.
`
                },

                {
                    role: "user",
                    content: message
                }

            ],

            temperature: 0.7

        });

        res.json({

            reply: completion.choices[0].message.content

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            reply:"Sorry, I am unable to connect to my AI brain."

        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

    console.log(`Bali Server Running on Port ${PORT}`);

});