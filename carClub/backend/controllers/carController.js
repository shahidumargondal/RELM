"use-strict";
const router = require("express")();
const { httpsCodes } = require("../constants/httpsCodes");
const carManager = require("../managers/carManager");
const { logger } = require("../config/winstonLogger");

router.post("/", async (req, res, next) => {
  const userId = req.user.id;
  const reqObj = Object.assign({}, req.body, { userId });
  carManager
    .createCar(reqObj)
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
    carManager
      .getCar(id)
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
    carManager
      .updateCar(id, reqObj)
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
