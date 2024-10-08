"use-strict";
const router = require("express")();
const { httpsCodes } = require("../constants/httpsCodes");
const authManager = require("../managers/authManager");
const { logger } = require("../config/winstonLogger");

router.post("/signup", async (req, res, next) => {
  const reqObj = Object.assign({}, req.body);
  authManager
    .createUser(reqObj)
    .then(async (result) => {
      logger.info(result.message);
      res.status(result.status).json(result);
    })
    .catch(async (error) => {
      console.log(error);
      logger.error(error);
      res.send({
        error: error,
        status: httpsCodes.SERVER_ERROR_CODE,
      });
    });
});

// Login api
router.post("/login", async (req, res) => {
    const reqObj = Object.assign({}, req.body);
    authManager
      .login(reqObj)
      .then(async (result) => {
        logger.info(result.message);
        res.status(result.status).json(result);
      })
      .catch(async (error) => {
        console.log(error);
        logger.error(error);
        res.send({
          error: error,
          status: httpsCodes.SERVER_ERROR_CODE,
        });
      });
  });
// get user by token
router.get("/", async (req, res, next) => {
    const id = req.user.id;
    authManager
      .getUser(id)
      .then((result) => {
        logger.info(result.message);
        res.status(result.status).json(result);
      })
      .catch(async (error) => {
        console.log(error);
        logger.error(error);
        res.send({
          error: error,
          status: httpsCodes.SERVER_ERROR_CODE,
        });
      });
  });
  
  // update user
  router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    const reqObj = req.body;
    authManager
      .updateUser(id, reqObj)
      .then((result) => {
        logger.info(result.message);
        res.status(result.status).json(result);
      })
      .catch(async (error) => {
        console.log(error);
        logger.error(error);
        res.send({
          error: error,
          status: httpsCodes.SERVER_ERROR_CODE,
        });
      });
  });
  

module.exports = router;
