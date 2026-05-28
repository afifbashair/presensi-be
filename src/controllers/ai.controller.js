const Groq =
  require("groq-sdk");

console.log(
  process.env.GROQ_API_KEY
);

const groq =
  new Groq({

    apiKey:
      process.env
        .GROQ_API_KEY,
  });

exports.chatAI =
  async (req, res) => {

    try {

      const { message } =
        req.body;

      const completion =
        await groq.chat
          .completions.create({

        messages: [

          {
            role: "system",

            content:
              "Kamu adalah asisten akademik kampus. Jawab singkat, jelas, dan membantu mahasiswa.",
          },

          {
            role: "user",

            content:
              message,
          },
        ],

        model:
          "llama-3.1-8b-instant",
      });

      const reply =
        completion
          .choices[0]
          .message.content;

      res.json({

        success: true,

        reply,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "AI gagal",
      });
    }
  };