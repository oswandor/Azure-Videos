


//4. Obtener todas las órdenes realizadas por el cliente con ID 27.


use('DBorders') 
db.orders.find({"customer_id":27})




//3. Obtener el nombre completo y número telefónico de los empleados que han sido
//responsables de órdenes que se hayan enviado antes del 1 de febrero de 2006.
use('DBorders') 

db.orders.aggregate([
  {$lookup:{
      from: "employees",
      localField: "employee_id",
      foreignField: "_id",
      as: "employee"}},

  {$match:{shipped_date: {$lt: ISODate("2006-02-01")}}},
 
  {$unwind: "$employee"},
  {$project: {
      _id: 0,
      last_name:{$concat: ["$employee.last_name", " ", "$employee.first_name"]},
      home_phone:"$employee.home_phone"}}])



//2. Obtener todas las órdenes que incluyen al menos un detalle de un producto con un
//precio unitario mayor a $10.
use('DBorders') 

db.orders.aggregate([
  {$lookup: {
      from: "products",
      localField: "details.product_id",
      foreignField: "_id",
      as: "product_details"}},

  {$unwind: "$product_details"},
  
  {$match: {"product_details.list_price": {$gt: 10}}}])






////////////////////////////////////////




use('DBorders') 

db.orders.aggregate([
    {
      $match: { _id: 30 } // Filtrar por ID del pedido
    },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "product_details"
      }
    }
  ])
  



//6. Obtener todos los nombres de los productos comprados.
 
use('DBorders')

db.orders.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "details.product_id",
        foreignField: "_id",
        as: "product_details"
      }
    },
    {
      $unwind: "$product_details"
    },
    {
      $project: {
        _id: 0,
        "product_name": "$product_details.product_name"
      }
    }
  ])
  


  //  . Obtener todos los pedidos realizados por la empresa: “Company A” 


  use('DBorders')

  
  db.orders.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer_details"
      }
    },
    {
      $match: {
        "customer_details.company": "Company A"
      }
    }
  ])
  


  