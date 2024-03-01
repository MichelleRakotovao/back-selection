class ResponseFormat {
    static message
    static values
    static status
    static code

    constructor(code, status, values, message) {
        this.message = message
        this.values = values
        this.status = status
        this.code = code
    }
}
module.exports = ResponseFormat