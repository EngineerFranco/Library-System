export const validateUpdateBook = (req, res, next) => {
    console.log('This is Validate Update.')
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
        return res.status(400).json({
            'httpCode': '400',
            'httpMessage': 'BAD_REQUEST',
            'moreInformation': errors,
        });
    }

    next();
};
