const express = require('express');
const app = express();
const helmet = require ('helmet');
const rateLimit = require ('express-rate-limit');
const jwt = require ('Jsonwebtoken');
const bcrypt = require ('bcrypt');
const dotenv = require ('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);

const {getUser} = require(`./database`)

const authorizePassword = process.env.AuthPassword;

function checkToken(req, res, next) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token,authorizePassword);
        next();
    } catch (error){
        res.status(401).send(error);
    }
}

const limiter = rateLimit({
    windowMs: 60*60*1000,
    max:5
})

// Middlewares

app.use(express.json());
app.use(helmet());

//Login

app.post('/login', limiter, async(req,res) => {
    const loginRequest = {
        user: req.body.user,
    }
    const pswRequest = req.body.password
    const user = await getUser(loginRequest)
    if(user.length === 0){
        req.status(400).send("invalid user or password")
    } else{
        const objetUser = user[0]
        const objetPsw = objetUser.password
        console.log(objetPsw)
        console.log(pswRequest)
        bcrypt.compare(passwordRequest, objectPassword, async function(err, result) {
            if (result) {
                const userToken = jwt.sign({user}, authorizationPassword)
                console.log(userToken)
                res.status(200).json(userToken)
            }
            else {
                res.status(400).send("invalid user or password")
            }
        });
    
    }
});

app.use(checkToken);

//Create User

app.post('/signup', limiter, userAlreadyExists, validateSignUpInformation, (req, res) =>{
    const user ={
        user: req.body.user,
        fullName: req.body.fullName,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address,
        password: req.body.password
    }
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) throw res.status(400).send("An error has happened")
        else{
        Object.defineProperty(user, 'hash', {value: hash})
            createUser(user)
            res.status(200).send("user created")}
});});
})


//Get Products List

app.get('/products' , async (req, res) =>{
    const productsList = await getProductsList()
    res.status(200).send(productsList)
}
)

//Get Product Information

app.get('/products/:id', async (req, res)=>{
    const product = {
        id: +req.params.id
    }
    const getOneProduct = await seeProduct(product) 
        if (getOneProduct.length === 0) {
            res.status(404).send("Product not found")
        }
        else {
            res.status(200).send(getOneProduct)
        }
    })

//Make An Order

app.post('/orders', validateOrderingInformation, async (req, res) =>{
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, authorizationPassword);
    const userId = user.user[0].id
    const order = {
        total_payment: +req.body.total_payment,
        payment: +req.body.payment,
        productsList : req.body.productsList,
        deliveryAddress: req.body.deliveryAddress
    }

    const orderPosted = await makeAnOrder(userId,order)
    if(orderPosted == false){
        res.status(400).send("An error has occurred")
    }else{
    res.status(201).send('We received your order')
    }
})


//Get Orders List

app.get('/orders', filterAdmin, async (req, res) => {
    const ordersList = await getOrdersList()
    res.status(200).send(ordersList)
})


//Post New Product

app.post('/products', filterAdmin, validateNewProductInformation, async (req, res)=>{
    const product = {
        name: req.body.name,
        price: +req.body.price,
        product_description: req.body.product_description
    }
    const newProduct = await addNewProduct(product)
    res.status(201).send(newProduct)
    
})

//Update Product

app.put('/products/:id', filterAdmin, validateUpdatedProductInformation, async (req, res)=>{
    const product = {
        id: +req.params.id,
        product_description: req.body.product_description,
        price: req.body.price
    }
    const validId = await validateIfExists(product,'products', 'id_product')
    if(validId.length === 1){
        const updatedProduct = await updateProduct(product)
        res.status(200).send(updatedProduct)
    }else{
        res.status(404).send("Product not found")   
    }

})


//Delete Product

app.delete('/products/:id',filterAdmin, async (req, res) =>{
    const product = {
        id: +req.params.id
    }
    const validId = await validateIfExists(product,'products', 'id_product')
    if(validId.length === 1){
        const deletedProduct = await deleteProduct(product)
        res.status(200).send("Product succesfully deleted")
    }else{
        res.status(404).send("Product not found")   
    }
})

//Get Order

app.get('/orders/:id', validatePermission, async (req, res)=>{
    const orderParameters ={
        id: +req.params.id
    }
    const validId = await validateIfExists(orderParameters,'orders', 'order_id')
    if(validId.length === 1){
        const order = await seeOrder(orderParameters)
        res.status(201).send(order)
    }else{
        res.status(404).send("Order not found")   
    }
    
})

//Update Order

app.put('/orders/:id', validatePermission, validateUpdatedOrderInformation, async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, authorizationPassword);
    const adminPrivilege = user.user[0].admin
    const order = { 
        id: +req.params.id
    }
    const validId = await validateIfExists(order,'orders', 'order_id')
    if(validId.length === 1){
        if(adminPrivilege === 1){
            const state ={
                stateId : +req.body.stateId,
                orderId : +req.params.id
            }
            changeOrderState(state)
            res.status(200).send("Order state succesfully updated")
        }else{
            const orderToModify ={
                orderId : +req.params.id,
                payment : req.body.payment,
                productsList : req.body.productsList

            }
            updateOrderInformation(orderToModify)
            res.status(200).send("Order state succesfully updated")
        }
    }else{
        res.status(404).send("Order not found")
    }
    
})

//Cancel An Order

app.delete('/orders/:id', filterAdmin, async (req, res)=>{
    const order ={
        id: req.params.id
    }
    const validId = await validateIfExists(order,'orders', 'order_id')
    if(validId.length === 1){
        cancelOrder(order)
        res.status(201).send("Order cancelled")
    }else{
        res.status(404).send("Order not found")
    }

})

function filterAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, authorizationPassword);
    const adminPrivilege = user.user[0].admin
    console.log(adminPrivilege);
    if(adminPrivilege === 1 ) {
        next();
    } else {
        res.status(403).send('forbidden access');
    }
}

async function validatePermission(req, res, next){
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, authorizationPassword);
    const userToCheck = user.user[0].id
    const adminPrivilege = user.user[0].admin
    const orderId = req.params.id
    const validateUser = await validateUserAccess(userToCheck, orderId)
    if(validateUser.length === 0 && adminPrivilege !==1){
        res.status(403).send('forbidden access')
    }if(validateUser.length === 0 && adminPrivilege === 1){
        next();
    }else{
        next()
    }
}

async function validateSignUpInformation(req, res, next){
    if(typeof req.body.user !== "string" || req.body.user === null){
        res.status(400).send("username is an obligatory field. Must be a combination of letters and numbers")
    }if(typeof req.body.fullName !== "string" || req.body.fullName === null){
        res.status(400).send("fullname is an Obligatory field. Must be your real name")
    }if(req.body.email.includes("@") === false || req.body.email === null){
        res.status(400).send("Obligatory field. Must be an email")
    }if(typeof req.body.telephone !== "number" || req.body.telephone === null){
        res.status(400).send("Obligatory field. Must be yout real telephone")
    }if(typeof req.body.address !== "string" || req.body.address === null){
        res.status(400).send("Obligatory field. Must be a real address")
    }else{
        next()
    }
}

async function userAlreadyExists(req, res, next){
    const user = {
        user: req.body.user,
        email: req.body.email 
    }
    const userSearchEngine = await alreadyExist(user)
    console.log(userSearchEngine.length)
    if(userSearchEngine.length === 0){
        next()
    }else{
        res.status(409).send('user or email already exists')

    }

}
async function validateOrderingInformation(req, res, next){
    const productsList = req.body.productsList
    const isAnArray = Array.isArray(productsList)
    if (isAnArray == true){
        const validProducts = productsList.every(item => item.id && item.quantity > 0) 
        if(validProducts === false || productsList.length === 0 ){
            res.status(400).send("Invalid order information")
        }else{
            if(typeof req.body.total_payment !== "number" || req.body.total_payment === null){
                res.status(400).send("Total amount must be a number")
            }if(typeof req.body.payment !== "number" || req.body.payment === null){
                res.status(400).send("Invalid payment method")
            }if(typeof req.body.deliveryAddress !== "string" || req.body.deliveryAddress === null){
                res.status(400).send("Delivery address is an obligatory field. Must be a combination of letters and numbers")
            }else{
                next()
            } }
}
}

async function validateNewProductInformation(req, res, next){
    if(typeof req.body.name !== "string" || req.body.name === null){
        res.status(400).send("product name is an obligatory field. Must be a character string")
    }if(typeof req.body.price !== "number" || req.body.price === null){
        res.status(400).send("product price is an obligatory field. Must be a number")
    }if(typeof req.body.product_description !== "string" && req.body.product_description != null){
        res.status(400).send("Product description must be a character string")
    }if( req.body.product_description == null ){
        next()
    }else{
        next()
    }
}

async function validateUpdatedProductInformation(req, res, next){
if(typeof req.body.product_description !== "string" && req.body.product_description != null){
    res.status(400).send("Product description must be a character string")
}if(typeof req.body.price !== "number" && req.body.price != null){
    res.status(400).send("Product price must be a number")
}if( req.body.product_description == null || req.body.price == null ){
    next()
}else{
    next()
}}
app.use((err, req, res, next) => {
    console.log("Error");
    res.status(400).end();
})

async function validateUpdatedOrderInformation(req, res, next){
    const productsList = req.body.productsList
    const isAnArray = Array.isArray(productsList)

    if(typeof req.body.stateId !== "number" && req.body.stateId != null){
        res.status(400).send("Order state reference invalid")
    }if(typeof req.body.payment !== "number" && req.body.payment != null){
        res.status(400).send("Order state reference invalid")
    }if(typeof req.body.total_payment !== "number" && req.body.total_payment != null){
        res.status(400).send("Product price must be a number")
    }if (productsList != null && isAnArray == true){
        const validProducts = productsList.every(item => item.id && item.quantity > 0) 
        if(validProducts === false || productsList.length === 0 ){
            res.status(400).send("Invalid order information")
        }
    }if(productsList != null && isAnArray == false){
        res.status(400).send("Invalid order information")
    }else{
        next()
    }

}


// Start the server

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
});