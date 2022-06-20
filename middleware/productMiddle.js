const  { checkSchema, validationResult } = require("express-validator");


const errorHandler = (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res.status(400).json({ validationError });
    }
    next();
};

//this is the schema cheaker for create and update of a Products
const createAndUpdateSchema = checkSchema({
    name: {
        isEmpty: {
            negated: true,
            errorMessage:"Must have value"
        },
        
    },
    count: {
        isNumeric:{
            errorMessage:"must be a number"
        }
    },
});



module.exports= {
     create: [createAndUpdateSchema, errorHandler]
};
