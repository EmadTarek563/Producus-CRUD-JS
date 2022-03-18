
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var mainBtn = document.getElementById("mainBtn");
var updateIndex = 0;

var productContainer;

if (localStorage.length == 0) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productsList"));
    displayProducts();
}

function addProduct() {
    if (checkInputs() == true) {

        product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value
        }

        if(mainBtn.innerHTML == "Update"){  
            productContainer[updateIndex] = product;
            mainBtn.innerHTML = "add product";
        }
        else{
            productContainer.push(product);
        }
        
        
        localStorage.setItem("productsList", JSON.stringify(productContainer));
        //clearForm();
        displayProducts();

    }
    else {
        alert("All fields are required");
    }
}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(productContainer));
    displayProducts();
}

function clearForm() {
    productName.value = "";
    productCategory.value = "";
    productDescription.value = "";
    productPrice.value = "";
}

function displayProducts() {
    var cartona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
        <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}


function checkInputs() {
    if (productName.value != "" && productPrice.value != "" && productDescription.value != "" && productCategory.value != "") {
        return true;
    }
    else {
        return false;
    }
}

function searchProduct(searchTerm){

    var cartona = ``;
    for(var i = 0; i < productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true){
            cartona += `<tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].description}</td>
                <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
                </tr>`;            
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function updateProduct(index){
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productDescription.value = productContainer[index].description;
    productCategory.value = productContainer[index].category;
    mainBtn.innerHTML = "Update";
    updateIndex = index;
}