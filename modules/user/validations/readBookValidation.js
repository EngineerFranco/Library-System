export const validateReadBook = (req, res, next) => {
    const { id } = req.params; 
    let errors = [];

    if (!id || id.trim() === '') { 
        errors.push('ID_REQUIRED');
    } else if (!/^\d+$/.test(id)) { 
        errors.push('ID_MUST_BE_NUMERIC');
    }

    if (errors.length > 0) {
        console.log("ERRORS:", errors);
        return res.status(400).render('error', {
            httpCode: 400,
            httpMessage: 'BAD_REQUEST',
            moreInformation: errors
        });
    }

    next();
};
