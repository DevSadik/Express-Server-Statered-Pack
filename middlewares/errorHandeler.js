

const errorHandeler = ( error, req, res, next ) => {
    const errStatus     = error.status || 500
    const errMessage    = error.message || "Unexpected Error"

    return res.status(errStatus).json({
        message : errMessage,
        status : errStatus,
        stack : error.stack
    })

};

// Error Handeler export
export default errorHandeler;