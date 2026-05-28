const axios = require("axios")

exports.chatAI = async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah asisten akademik kampus. Jawab singkat dan jelas."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    res.json({
      result: response.data.choices[0].message.content
    })
  } catch (error) {
    console.log(error.response?.data || error)

    res.status(500).json({
      message:
        error.response?.data?.error?.message || "AI gagal"
    })
  }
}