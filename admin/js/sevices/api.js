function Api() {
    this.arrApi = []

    this.fecthData = function () {
        const promise = axios ( {
            url : `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product`,
            method : "GET",
        });
        return promise;
    }

    this.addProduct = function (product) {
        const promise = axios ( {
            url : `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product`,
            method : "POST",
            data : product
        });
        return promise;
    }

    this.delete = function (id) {
        const promise = axios ( {
            url : `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product/${id}`,
            method : "DELETE",
        });
        return promise;
    }

    
    this.edit = function (id) {
        const promise = axios ( {
            url : `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product/${id}`,
            method : "GET",
        });
        return promise;
    }


    this.upDate = function (product) {
        const promise = axios ( {
            url : `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product/${product.id}`,
            method : "PUT",
            data: product,
        });
        return promise;
    }
}