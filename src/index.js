const api = new Api();


function getListProduct() {
    const promise = api.fecthData();

    promise
        .then(function (result) {
            renderUI(result.data);

        })
        .catch(function (error) {
            console.log(error);
        })

    return;
}

getListProduct();

function renderUI(data) {
    console.log(data)
    let content = "";

    data.forEach(function (product) {
        content += `
        <div class="col-12 col-md-6 col-lg-3">
        <div class="card cardPhone">
        <img src="${product.img}" class="card-img-top" alt="..." />
        <div class="card-body">
        <h3 class="cardPhone__title">${product.name}</h3>
            <div class="d-flex justify-content-between">
            <div>
                
                <p class="cardPhone__text">${product.desc}</p>
            </div>
            <div>
                <h3 class="cardPhone__title">$${product.price}</h3>
            </div>
            </div>
            <div class="d-flex justify-content-between">
            <div class="cardPhone__rating">
                <p> Màn hình : ${product.screen}</p>
                <p> Camera trước: ${product.frontCamera}</p>
                <p> Camera sau: ${product.backCamera}</p>
            </div>
            
            </div>
            <div class="eleCha">
                <button  onclick = "addCart(${product.id})"  class="btnPhone-shadow products">
                <i class="fa fa-shopping-cart"></i> Buy Now
                </button>
            </div>
        </div>
        </div>
    </div>
        
        
        
        `
    })
    document.getElementById("products__content_main").innerHTML = content;
}

/**
 * Phân loại sản phẩm
 */

function selectValue(data) {
    let selectvalue = document.getElementById("brand").value;
    let Arr = [];

    if (selectvalue === "All") {
        // for (let i = 0; i < data.length; i++) {

        //     Arr.push(data[i])
        // }
        Arr = data;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (selectvalue === data[i].type) {
                Arr.push(data[i])
                console.log(data[i].name)
            };


        }

    }

    renderUI(Arr);

}
document.getElementById("brand").onchange = function () {
    let promise = api.fecthData();

    promise
        .then(function (result) {
            selectValue(result.data)
            console.log(result.data[2].name)
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Thêm giỏ hàng
 */
let cart = [];
function addCart(id) {
    let promise = api.fecthObject(id);

    promise
        .then(function (result) {
            add(result.data)
        })
        .catch(function (error) {
            console.log(error);
        });

};

function add(data) {
    let id = data.id;
    let found = false;


    cart.forEach(function (product) {
        if (product.id == id) {
            if (product.count) {
                product.count++;
            };
            found = true;

        };
    });
    if (!found) {
        data.count = 1;
        cart.push(data);
    }

    console.log(cart);

    let content = "";
    cart.forEach(function (product, index) {
        content += `
            <tr>
                <td>${index + 1} </td>
                <td>${product.name}</td>
                <td><img src="${product.img}" width="50" /></td>
                <td>${product.price}</td>
                <td>
                <i onclick = "upCount(${product.id})"  class="fa-solid fa-minus"></i>
                  ${product.count}
                <i  class="fa-solid fa-plus"></i>
                </td>
            </tr>
        `
    })
    
    document.getElementById("tblDanhSachSP").innerHTML = content;

    
}










