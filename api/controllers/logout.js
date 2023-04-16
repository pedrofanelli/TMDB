class LogoutController {
  static async tryLogout(req, res) {
    res.clearCookie("token");
    res.statusCode = 204;
    res.statusMessage = "COOKIES DELETED";
    res.send();
  }
}

module.exports = LogoutController;
