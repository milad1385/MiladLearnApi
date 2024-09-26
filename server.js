const app = require("./app");
require("dotenv").config();
const connectToDB = require("./configs/db");

const port = process.env.PORT || 4000;

(async () => {
  await connectToDB();
})();

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
