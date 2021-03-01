const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
/*Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
 **Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 */
const bodyParser = require("body-parser");
/*Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
 **Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 */
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator"); //express-validator@5.3.1
const cors = require("cors");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const rateRoutes = require("./routes/rate");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(`Error connecting to the database:\n ${err}`);
  });

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);
app.use("/api", commentRoutes);
app.use("/api", rateRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
