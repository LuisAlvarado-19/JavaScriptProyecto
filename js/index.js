// Inicializamos el objeto cash.
let cash = _cashier(db_cash);
let products = _products(db_products);
let purchase = _purchase(db_purchase);
// let sales = _sales(db_sales)
// funcion
const getCash = () => {
    let cashText = document.getElementById('cash');
    cashText.innerHTML = `Capital $ ${cash.getStored()} CR`;
}
const buildTable = () => {
    let table = document.getElementById('productTable');
    let list = table.getElementsByTagName('tbody')[0];
    list.innerHTML = '';

    products.getAllProducts().forEach(element => {
        let row = document.createElement('tr');
        const sellButton = `sales-${element.id}`;
        const purchaseButton = `purchase-${element.id}`;
        row.innerHTML = `
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td>${element.stored}</td>
        <td>${element.price}</td>
        <td><button type="button" class="btn btn-primary" id="${sellButton}" >Vender</button></td>
        <td><button type="button" class="btn btn-secondary" id="${purchaseButton}" >Comprar</button></td>
        `;
        list.appendChild(row);
        document.getElementById(sellButton).addEventListener('click', (e) => {
            sellButtonEvent(element.id);
        })
    });
}
const sellButtonEvent = (id) => {
    let container = document.getElementById("sellContainer");
    let product = products.getProducts(id);
    container.innerHTML = `
    <div class="col">
    <h5>${product.name}</h5>
    </div>
    <div class="col">
    <h6> Existencia: ${product.stored} kg </h6>
    </div>
    <div class="col">
    <label for="sellItem"> Cantidad a Vender(kg) </label>
    <input type="text" class="form-control" id="SellItem"
    <button type="button" class="btn btn-success" id="btnSellItem">Vender</button>
    </div>
    <div class="col">
    <button type="button" class="btn btn-danger" id="cancelSell">Cancelar</button>
    </div>`;
    document.getElementById("btnSellItem").addEventListener("click", (e) => {
        const amount = document.getElementById("SellItem").value;
        sellProductionAction(product, new Number(amount));
    })
    document.getElementById("cancelSell").addEventListener("click", cancelAction);
};

const sellProductionAction = (product, amount) => {
    try{
        const totalSale = amount * product.price;
//         product.sale(product.id, amount);
//         cash.sale(totalSale);
//         sales.new (product.id, amount, product.id);
    }

    catch(err){
//         alert(err.error);
    }
    // buildTable();
    // getCash();
    // cancelAction();
}

// const cancelAction = () => {
//     document.getElementById("sellContainer").innerHTML = "";
// };

const newProduct = () => {
    const name = document.getElementById('np_name').value;
    // Para los otros valores los convertiremos a valores numericos de la siguiente manera.
    const stored = new Number(document.getElementById('np_stored').value);
    const purchasePrice = new Number(document.getElementById('np_p_price').value);
    const salesPrice = new Number(document.getElementById('np_s_price').value);


    try {
        cash.purchase(stored * purchasePrice);
        const newProduct = products.newProduct(name, stored, salesPrice);
        purchase.new(newProduct.id, stored, purchasePrice);

    }
    catch (err) {
        alert(err.error)
    }
    buildTable();
    getCash();
    addProductEventEnd();
};

const submitEvent = (e) => {
    e.preventDefault();
    switch (e.target.id) {
        case 'addProduct':
            newProduct();
            break;
        default:
            break;
    }

}
// El evento que hara aparecer el formulario
const addProductEventStart = () => {
    // cuando le de click se añade el formulario en block
    document.getElementById('addProduct').style.display = 'block';
    // cuando se le de click al boton y se desaparece el boton de añadir producto
    document.getElementById('addProductBtn').style.display = 'none';
}

const addProductEventEnd = () => {
    document.getElementById('addProduct').style.display = 'none';
    document.getElementById('addProductBtn').style.display = 'block';
    document.getElementById('addProduct').reset();
}

addEventListener('load', getCash);
addEventListener('load', buildTable);
addEventListener('submit', submitEvent);
// referenciamos el boton y luego añadimos el evento
document.getElementById('addProductBtn').addEventListener('click', addProductEventStart);
document.getElementById('cancelNewProd').addEventListener('click', addProductEventEnd);