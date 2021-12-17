let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let StudentSchema = require("../models/Student");

router.post("/create-student", (req, res, next) => {
  StudentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.get("/", (req, res) => {
  StudentSchema.find((error, data) => {
    if (error) {
      return error;
    } else {
      return res.json(data);
    }
  });
});

router
  .route("/update-student/:id")
  .get((req, res) => {
    StudentSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return error;
      } else {
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    StudentSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Student updated");
          return res.json(data);
        }
      }
    );
  });

router.delete("/delete-student/:id", (req, res, next) => {
  StudentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
