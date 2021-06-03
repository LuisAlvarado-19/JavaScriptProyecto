// objeto de dinero al inicio del dia 
const db_cash = 10000;

// objeto de inventario al inicio del dia 
const db_products = [
    {id: '1',name:'manzana', stored:1500, price:15},
    {id: '2',name:'pera', stored:1000, price:13},
    {id: '3',name:'sandia', stored:2500, price:18},
    
]

// objeto de registro de ventas.
const sales = [
 {  productId: 1,
    date: new Date(2020,04,10),
    quantity:100,
    totalPrince:100
}]

// Registro de compras
const db_purchase = [
    {   productId: 2,
        date: new Date(2020,04,10),
        quantity:50,
        prince:7.50,
        totalPrince:375
    }
]