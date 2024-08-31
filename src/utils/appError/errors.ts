export type errorsEnum = 'ERR_BAD_REQUEST' | 'ERR_INTERNAL' | 'ERR_NOT_FOUND' | 'ERR_HTTP_SERVER';
const errors = {
    ERR_BAD_REQUEST: {
        code: 'app/errors/bad-request',
        message: 'Bad request'
    },
    ERR_INTERNAL: {
        code: 'app/errors/internal',
        message: 'Something went wrong'
    },
    ERR_NOT_FOUND: {
        code: 'app/errors/not-found',
        message: 'Not found'
    },
    ERR_HTTP_SERVER: {
        code: 'app/errors/http',
        message: 'Something went wrong'
    }
}

export default errors;