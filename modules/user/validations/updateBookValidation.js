export const validateUpdateBook = (req, res, next) => {
    console.log('This is Validate Update.')

    const {title, author, publishedDate } = req.body;
    const { id } = req.params; 
    let errors = [];

    if (!id || id.trim() === '') { 
        errors.push('ID_REQUIRED');
    } else if (!/^\d+$/.test(id)) { 
        errors.push('ID_MUST_BE_NUMERIC');
    }

    if (!title) {
        errors.push('TITLE_REQUIRED');
    } else if (typeof title !== 'string') {
        errors.push('TITLE_MUST_BE_STRING');
    }

    if (!author) {
        errors.push('AUTHOR_REQUIRED');
    } else if (typeof author !== 'string') {
        errors.push('AUTHOR_MUST_BE_STRING');
    }

    if (!publishedDate) {
        errors.push('PUBLISHED_DATE_REQUIRED');
    } else if (isNaN(Date.parse(publishedDate))) {
        errors.push('INVALID_PUBLISHED_DATE');
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
