const akupancharServiceModel = require("../models/akupancharServiceModel");
const jesthaNagarikModel = require("../models/jesthaNagarikModel");
const ksharsutraServiceModel = require("../models/ksharsutraServiceModel");

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

/* Create Jestha Nagarik */
const createJesthaNagarik = (req, res) => {
  const { panels = {}, ...headerData } = req.body;

  jesthaNagarikModel.createJesthaNagarik(headerData, panels, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to save record",
        error: err,
      });
    }

    res.status(201).json(result);
  });
};

/* Get All */
const getJesthaNagarik = (req, res) => {
  jesthaNagarikModel.getAllJesthaNagarik((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch data",
      });
    }

    res.json(result);
  });
};

/* Delete */
const deleteJesthaNagarik = (req, res) => {
  jesthaNagarikModel.deleteJesthaNagarik(req.params.id, (err) => {
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

/* Panels */
const getJesthaPanels = (req, res) => {
  jesthaNagarikModel.getJesthaPanels(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch details",
      });
    }

    res.json(result);
  });
};

/* Create Ksharsutra */
const createKsharsutraService = (req, res) => {
  ksharsutraServiceModel.createKsharsutraService(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to save service",
        error: err,
      });
    }

    res.status(201).json(result);
  });
};

/* Get All */
const getKsharsutraServices = (req, res) => {
  ksharsutraServiceModel.getAllKsharsutraServices((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch data",
      });
    }

    res.json(result);
  });
};

/* Delete */
const deleteKsharsutraService = (req, res) => {
  ksharsutraServiceModel.deleteKsharsutraService(req.params.id, (err) => {
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

module.exports = {
  createAkupancharService,
  getAkupancharServices,
  deleteAkupancharService,
  getAkupancharItems,

  createJesthaNagarik,
  getJesthaNagarik,
  deleteJesthaNagarik,
  getJesthaPanels,

  createKsharsutraService,
  getKsharsutraServices,
  deleteKsharsutraService,
};
