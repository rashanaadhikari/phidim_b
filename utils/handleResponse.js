
export const  successResponse = (res, data, message = 'Success') => {
    return res.status(200).json({
        status: 'success',
        message,
        data
    });
}


export const errorResponse = (res, error, message = 'Error') => {
    return res.status(500).json({
        status: 'error',
        message,
        error: error.message || error
    });
}

export const validationErrorResponse = (res, message) => {
    return res.status(400).json({
        status: 'fail',
        message
    });
};
