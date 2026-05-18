exports.getStats = async (req, res) => {
  const totalUsers =
    await User.count();

  const totalCourses =
    await Course.count();

  const totalMeetings =
    await Meeting.count();

  const totalAttendance =
    await Attendance.count();

  res.json({
    totalUsers,
    totalCourses,
    totalMeetings,
    totalAttendance,
  });
};