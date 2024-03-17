function Validation () {
    this.kiemTraRong = function (value, spanId, message) {
        if (value === "") {
            getELE(spanId).innerHTML = message;
            return false;
        }

        getELE(spanId).innerHTML = "";
        return true;
    }
}