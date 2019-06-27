const admin = require("firebase-admin");

const fbController = {};

fbController.destroy = (req, res) => {
  admin
    .auth()
    .deleteUser(req.params.id)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
};

fbController.create = (req, res) => {
  admin
    .auth()
    .createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.username,
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      res.json({
        uid: userRecord.uid
      });
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });
};

module.exports = fbController;
