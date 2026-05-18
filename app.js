const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const meetingRoutes = require("./src/routes/meeting.routes");
const profileRoutes = require("./src/routes/profile.routes");
const notificationRoutes = require("./src/routes/notification.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/campus", require("./src/routes/campus.routes"));
app.use("/api/attendance", require("./src/routes/attendance.routes"));
app.use("/api/courses", require("./src/routes/course.routes"));
require("./src/relations/auth.relations");
require("./src/relations/presensi.relations");
app.use("/api/meetings", require("./src/routes/meeting.routes"));
app.use("/api/meetings", meetingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);



module.exports = app;