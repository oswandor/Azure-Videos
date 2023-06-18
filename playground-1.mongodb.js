/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('InventarioDB');


// creacion de las colecciones  
db.createCollection("usu_usuario") 
db.createCollection("per_persona") 
db.createCollection("mun_municipio")

db.createCollection("reg_responsablexgestion")
db.createCollection("ges_gestion")
db.createCollection("mun_municipio") 
db.createCollection("dep_departamento")




// Select the database to use.
use('InventarioDB');


// Ingresar a la collection Usuario 
db.getCollection("usu_usuario").insertOne({
    user_id: 1,//pk 
    use_id_per: '1',//fk 
    use_usuario: 'Ronal',
    usu_pass: 'chanchito2023',
    usu_rol: 1,
    usu_estado: 'Soltera',
    usu_fecha_creacion: new Date("2023-05-02"),
    usu_fecha_modificacion: new Date("2023-05-02")
})


// Ingresar a la collection persona
db.getCollection("per_persona").insertOne({
    _id: "1",
    per_id: 1,//pk 
    per_id_mun_residencia:1,//fk
    per_primer_nombre: "Ronal",
    per_segundo_nombre: "Oswaldo",
    per_primer_apellido: "Gonzalez",
    per_segundo_apellido: "Guardado",
    per_dui: "0312222220",
    per_codigo_emp:0003, 
    per_fecha_nacimiento: new Date("2000-01-18"),
    per_fecha_creacion: new Date("2023-05-05"),
    per_fecha_modificacion: new Date("2023-05-05")
})


// Ingresar a la collection  
db.getCollection("reg_responsablexgestion").insertOne({
    _id: 1, 
    reg_id: 1, //pk 
    reg_id_ges : 1 ,//fk 
    reg_id_per:"1" , //fk 
    reg_cargo:1 , 
    reg_estado: 1 ,
    reg_fecha_creacion:new Date("2023-05-05") , 
    reg_fecha_modoficacion: new Date("2023-05-05"),  

})



db.getCollection("ges_gestion").insertOne({
    _id: 1 , // pk 
    ges_id:1 , 
    ges_id_mun:  1,// fk municipio  
    ges_nombre:"Gestion"  , 
    ges_descripcion:"Descripcion" , 
    ges_tipo_gestion:1 , 
    ges_fecha_inicio: new Date("2023-05-05"),
    ges_fecha_fin:new Date("2023-05-05") , 
    ges_num_benef:  1, 
    ges_estado: 1, 
    ges_fecha_creacion: new Date("2023-05-05"), 
    ges_fecha_modificacion:new Date("2023-05-05") ,  
})





db.getCollection("mun_municipio").insertOne({
    _id: 1,
    mun_id_dep: 1,
    mun_nombre: "Ciudad Capital",
    mun_estado:1,
    mun_usu_creacion: 1,
    mun_usu_modificacion:1,
    mun_fecha_creacion: new Date("2022-05-02T08:00:00Z"),
    mun_fecha_modificacion: new Date("2022-05-02T08:00:00Z")
})



db.getCollection("dep_departamento").insertOne({
    _id: 1, 
    dep_nombre: "Departamento 1",
    dep_estado:1,
    dep_usu_creacion:1,
    dep_usu_modificacion:1,
    dep_fecha_creacion: new Date("2023-05-02T10:00:00Z"),
    dep_fecha_modificacion: new Date("2023-05-02T10:00:00Z")
})






////////////////   aqui algunas maneras  de hacer consulta  
// Select the database to use.

// mostrar todos los datos de la collection per_persona 
db.getCollection("per_persona").find({})


use('InventarioDB');



db.getCollection("usu_usuario").aggregate([ // Se ejecuta una consulta de agregación en la colección "usu_usuario"
    {
      $lookup: { // Se utiliza el operador $ lookup para realizar un join con otra colección
        from: "per_persona", // El nombre de la colección con la que se quiere hacer el join es "per_persona"
        localField: "use_id_per", // El campo en la colección "usu_usuario" que se utilizará para hacer la unión es "use_id_per"
        foreignField: "_id", // El campo en la colección "per_persona" que se utilizará para hacer la unión es "_id"
        as: "persona" // El resultado de la unión se almacenará en el campo "persona" de la colección "usu_usuario"
      }
    }
])

  
use('InventarioDB');


// regresar los datos que tenga asociado  reg_responsablexgestion con per_persona  
db.getCollection("reg_responsablexgestion").aggregate([
    {
        $lookup:{
            from: "per_persona",
            localField: "reg_id_per",
            foreignField: "_id" , 
            as: "persona"   
        }

    }])

// regrear los datos asocioados que tenga reg_responsablexgestion con per_persona 
db.getCollection("reg_responsablexgestion").aggregate([
    {
        $lookup:{
            from:"ges_gestion" , 
            localField:"reg_id_ges",
            foreignField: "_id" , 
            as: "gestion" 
        }
    }
])


// Select the database to use.
use('InventarioDB');

db.getCollection("per_persona").aggregate([{
    $lookup:{
        from:"mun_municipio" , 
        localField:"per_id_mun_residencia", 
        foreignField:"_id", 
        as:"municipio_persona"
    }
}])