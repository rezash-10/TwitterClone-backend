let tempApiHandler = require("../models/temp-manager");

const getFakeJsonArr = (req, res,next) => {   
    console.log("getFakeJsonArr")
    res.json(tempApiHandler.getFakeJsonArr())
}
module.exports = {
    getFakeJsonArr
}