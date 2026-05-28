const axios = require("axios");

exports.chatAI =
  async (req, res) => {

    try {

      const { message } =
        req.body;

      const response =
        await axios.post(

          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

          {
            contents: [
              {
                parts: [
                  {
                    text:
                      `Kamu adalah asisten akademik kampus. Jawab dengan singkat dan jelas.\n\nPertanyaan: ${message}`,
                  },
                ],
              },
            ],
          }
        );

      const result =
        response.data
          .candidates[0]
          .content.parts[0]
          .text;

      res.json({
        success: true,
        reply: result,
      });

    } catch (err) {

      console.log("AI ERROR:");
      console.log(err.response?.data || error.message);

      console.log(err);

      res.status(500).json({
        message:
          "AI gagal",
      });
    }
  };