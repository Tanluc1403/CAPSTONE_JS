function Api() {
    // lấy ds products từ server
    this.fecthData = function () {  
      const promise = axios({
        url: "https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product",
        method: "GET",

      });
  
      return promise;
    };
    

    this.fecthObject = function (id) {  
      const promise = axios({
        url: `https://65d8a6e0c96fbb24c1bc04c5.mockapi.io/api/product/${id}`,
        method: "GET",
        
      });
  
      return promise;
    };
  }