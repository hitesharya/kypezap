class UserController {
  async getUsers(req, res) {
    return res.status(200).send({ data: "respond with a resource" });
  }
}

module.exports = new UserController();
