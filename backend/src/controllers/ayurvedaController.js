const akupancharServiceModel = require("../models/akupancharServiceModel");

/* Create */
const createAkupancharService = (req, res) => {
  const { items = [], ...headerData } = req.body;

  akupancharServiceModel.createAkupancharService(
    headerData,
    items,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save service",
          error: err,
        });
      }

      res.status(201).json(result);
    },
  );
};

/* Get All */
const getAkupancharServices = (req, res) => {
  akupancharServiceModel.getAllAkupancharServices((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch records",
      });
    }

    res.json(result);
  });
};

/* Delete */
const deleteAkupancharService = (req, res) => {
  akupancharServiceModel.deleteAkupancharService(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Delete failed",
      });
    }

    res.json({
      message: "Deleted successfully",
    });
  });
};

/* Items */
const getAkupancharItems = (req, res) => {
  akupancharServiceModel.getAkupancharItems(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch items",
      });
    }

    res.json(result);
  });
};

module.exports = {
  createAkupancharService,
  getAkupancharServices,
  deleteAkupancharService,
  getAkupancharItems,
};
