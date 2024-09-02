class CustomAPIError extends Error {
    // constructor dijalankan ketika class diinisialisasi pertama kali
    constructor(message) {
        super(message);
    }
}

module.exports = CustomAPIError;
