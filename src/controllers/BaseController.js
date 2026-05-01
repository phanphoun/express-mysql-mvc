class BaseController {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    static notFound(res, message = 'Resource not found') {
        return res.status(404).json({
            success: false,
            message
        });
    }

    static created(res, data = null, message = 'Resource created successfully') {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }
}

export default BaseController;
