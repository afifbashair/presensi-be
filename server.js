const app = require("./app");
const dbAuth = require("./src/config/dbAuth");
const dbPresensi = require("./src/config/dbPresensi");

const PORT = process.env.PORT || 3000;

Promise.all([
  dbAuth.sync(),
  dbPresensi.sync()
]).then(() => {
  console.log("DB Ready");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});