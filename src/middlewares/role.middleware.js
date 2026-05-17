module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;

    const isAllowed = userRoles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!isAllowed) {
      return res.status(403).json({
        message: "Akses ditolak",
      });
    }

    next();
  };
};