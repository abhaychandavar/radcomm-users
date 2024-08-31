export type httpErrorsEnum = 'ERR_BAD_REQUEST' | 'ERR_NOT_FOUND' | 'ERR_HTTP_SERVER' | 'ERR_UNAUTHENTICATED' | 'ERR_UNAUTHORIZED';

const httpErrors = {
    ERR_BAD_REQUEST: {
        code: 'app/errors/bad-request',
        message: 'Bad request',
        statusCode: 400
    },
    ERR_NOT_FOUND: {
        code: 'app/errors/not-found',
        message: 'Not found',
        statusCode: 404
    },
    ERR_HTTP_SERVER: {
        code: 'app/errors/http',
        message: 'Something went wrong',
        statusCode: 500
    },
    ERR_UNAUTHENTICATED: {
        code: 'app/errors/unauthenticated',
        message: 'Unauthenticated',
        statusCode: 401
    },
    ERR_UNAUTHORIZED: {
        code: 'app/errors/unauthorized',
        message: 'Unauthorized',
        statusCode: 403
    }
}

export default httpErrors;