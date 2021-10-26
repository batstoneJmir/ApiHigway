const { Router } = require("express");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  let carObject = [];
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json"
      );
      let carMakes = {};
      carMakes = resp.data.Results;

      carObject = { carNames: carMakes };

      res.json(carObject.carNames);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  sendGetRequest();
}); 

router.get("/:manufacture/:year", (req, res, next) => {
    let carObject = [];
    const  sendGetManufacturYear = async () => { 
      try { 
        const resp = await axios.get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/${req.params.manufacture}/?year=${req.params.year}&format=json`
        ); 
        let carMakes = {};
        carMakes = resp.data.Results; 
        carObject = { carNames: carMakes };

        res.json(carObject.carNames);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendGetManufacturYear();
  }); 


  router.get("/:vin", (req, res, next) => {
    let carObject = [];
    const  sendGetVin = async () => { 
      try { 
        const resp = await axios.get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${req.params.vin}?format=json`
        ); 
        let carMakes = {};
        carMakes = resp.data.Results; 
      
        let returnCarObject= { Model: carMakes[0].Model,  
            Make: carMakes[0].Make,
            year: carMakes[0].ModelYear,
        } 
        res.json(returnCarObject);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendGetVin();
  });
module.exports = router;
