export const validateCreateBook = (req, res, next) => {
    console.log("REQ:", req.body)
    const { title, author, publishedDate } = req.body;
    let errors = [];

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
