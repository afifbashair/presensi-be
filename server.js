require("dotenv").config();
const app = require("./app");
const dbAuth = require("./src/config/dbAuth");
const dbPresensi = require("./src/config/dbPresensi");

const PORT = process.env.PORT || 3000;

Promise.all([
  dbAuth.sync(),
  dbPresensi.sync()
])
.then(() => {
  console.log("DB Ready");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ DB SYNC ERROR:", err);

  // penting: biar Cloud Run langsung lihat error
  process.exit(1);
});