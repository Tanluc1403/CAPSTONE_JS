
const getELE = (id) => document.getElementById(id);

const api = new Api();
const validation = new Validation();

const getListProduct = () => {
    const promise = api.fecthData();

    promise
        .then(function (result) {
            console.log(result.data)
            renderUI(result.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}

getListProduct();

const renderUI = (data) => {
    let content = "";

    data.forEach(function (product, index) {


        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="./../img/${product.img}" width = 50/>
            </td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.screen}</td>
            <td>${product.type}</td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick = "editProduct(${product.id})"> Edit</button>
                <button class="btn btn-danger" onclick = "deleteProduct (${product.id})" > Delete</button>
            </td>
        </tr>
        `
    })
    getELE("tblDanhSachSP").innerHTML = content;
}

/**
 * sửa title và tạo nút add product
 */
getELE("btnThemSP").onclick = function () {
    //change title model
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm"; //[0] : class đầu tiên

    //create button "Add Product" : tạo nút để add
    const btnAdd = `<button class ="btn btn-success" onclick = "addProduct()" > Add Product </button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};


/**
 * Add product
 */
const addProduct = () => {
    const name = getELE("TenSP").value;
    const price = getELE("GiaSP").value;
    const img = getELE("HinhSP").value;
    const backCamera = getELE("BCamera").value;
    const frontCamera = getELE("FCamera").value;
    const screen = getELE("Screen").value;
    const type = getELE("type").value;
    const desc = getELE("MoTa").value;

    //validation:
    let isValid = true;
    isValid &= validation.kiemTraRong(name,"spanTenSP","(*) Tên sản phẩm không được trống");
    isValid &= validation.kiemTraRong(price,"spanGiaSP","(*) Giá sản phẩm không được trống");
    isValid &= validation.kiemTraRong(img,"spanHinhSP","(*) Hình sản phẩm không được trống");
    isValid &= validation.kiemTraRong(backCamera,"spanBCameraSP","(*) Camera không được trống");
    isValid &= validation.kiemTraRong(frontCamera,"spanFCameraSP","(*) Camera không được trống");
    isValid &= validation.kiemTraRong(screen,"spanScreenSP","(*) Màn hình không được trống");
    isValid &= validation.kiemTraRong(type,"spanTypeSP","(*) Loại sản phẩm không được trống");
    isValid &= validation.kiemTraRong(desc,"spanDescSP","(*) Mô tả không được trống");

    if(!isValid) return null;

    const product = new Product("", name, price, img, backCamera, frontCamera, screen, type, desc);

    const promise = api.addProduct(product)
    promise
        .then(function () {
            //close Modal  : đóng bảng modal
            document.getElementsByClassName("close")[0].click();

            //re-fetch data : để load lại trang và cập nhật sp
            getListProduct();

            // reset form
            getELE("TenSP").value = "";
            getELE("GiaSP").value = "";
            getELE("HinhSP").value = "";
            getELE("BCamera").value = "";
            getELE("FCamera").value = "";
            getELE("Screen").value = "";
            getELE("type").value = "";
            getELE("MoTa").value = "";
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * Delete
 */
const deleteProduct = (id) => {
    const promise = api.delete(id)
    promise
        .then(function () {
            getListProduct();
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * Edit
 */
const editProduct = (id) => {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thay đổi thông tin sản phẩm";
    const btnUpdate = `<button class="btn btn-success" onclick = "update(${id})"> Cập nhật</button >`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

    const promise = api.edit(id)
    promise
        .then(function (reslut) {
            console.log(reslut.data);
            const product = reslut.data;
            console.log(reslut.data)
            getELE("TenSP").value = product.name;
            getELE("GiaSP").value = product.price;
            getELE("HinhSP").value = product.img;
            getELE("BCamera").value = product.backCamera;
            getELE("FCamera").value = product.frontCamera;
            getELE("Screen").value = product.screen;
            getELE("type").value = product.type;
            getELE("MoTa").value = product.desc;
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * Update
 */
const update = (id) => {
    const name = getELE("TenSP").value;
    const price = getELE("GiaSP").value;
    const img = getELE("HinhSP").value;
    const backCamera = getELE("BCamera").value;
    const frontCamera = getELE("FCamera").value;
    const screen = getELE("Screen").value;
    const type = getELE("type").value;
    const desc = getELE("MoTa").value;

    const product = new Product(id, name, price, img, backCamera, frontCamera, screen, type, desc);

    const promise = api.upDate(product)
    promise
        .then(function (reslut) {
            console.log(reslut)
            //close Modal  : đóng bảng modal
            document.getElementsByClassName("close")[0].click();
            //re-fetch data : để load lại trang và cập nhật sp
            getListProduct();
        })

        .catch(function (error) {
            console.log(error)
        })
}