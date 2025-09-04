import express from 'express';
import cors from 'cors';
import pool from './database.js';  

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post('/customer', async (req, res) => {
  const { name, email, city , state, phone, products } = req.body;
  console.log(`Name: ${name}, Email: ${email}, city: ${city}, state: ${state}, Phone: ${phone}`);
  await senddataCustomers({name, email, city, state, phone, products}, "Customers");
  res.send('Form data received');
});



app.post('/supplier', async (req, res) => {
  const { SupplierName, email, city , state, phone, products } = req.body;
  console.log(`Name: ${SupplierName}, Email: ${email}, city: ${city}, state: ${state}, Phone: ${phone}`);
  await senddataSuppliers({SupplierName, email, city, state, phone, products},"Suppliers");
  res.send('Form data received');
})

//testDBConnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

async  function senddataSuppliers({SupplierName, email, city, state, phone, products}) {

    try {
        const [rows] = await pool.query(`insert into  Suppliers (SupplierName, email, city, state, phone) values(?,?,?,?,?)`, [SupplierName, email, city, state, phone]);
        console.log('Database connection successful:', rows);


        for (const product of products) {
          const [rows1] = await pool.query(`insert into  Products (productName, costPrice, sellingPrice, stock) values(?,?,?,?)`, [product.productName, product.costPrice, product.sellingPrice, product.quantity]);
          console.log('Database connection successful product added:', rows1);
        }
        
    } catch (err) {
        console.error('Database connection failed:', err.message, err.stack);
    }
}

async  function senddataCustomers({name, email, city, state, phone, products}) {

    try {
        const [cust] = await pool.query(`insert into  Customers (name, email, city, state, phone) values(?,?,?,?,?)`, [name, email, city, state, phone]);
        console.log('Database connection successful:', cust);


        for (const product of products) {

          const [productrow] = await pool.query(`select productID, stock from Products where productName = ?`, [product.productName]);
          console.log('Database connection successful product selected:', productrow);
          
          if(productrow.length > 0) {
            const availableStock = productrow[0].stock;
            if(availableStock >= product.quantity) {
              const [rows1] = await pool.query(`insert into  OrderDetails (orderID, productID, quantity, price) values(?,?,?,?)`, [cust.insertId, productrow[0].productID, product.quantity, product.price]);
              console.log('Database connection successful order details added:', rows1);
              const newStock = availableStock - product.quantity;
              const [updatestock] = await pool.query(`update Products set stock = ? where productID = ?`, [newStock, productrow[0].productID]);
              console.log('Database connection successful stock updated:', updatestock);
            } else {
              console.log(`Insufficient stock for product ${product.productName}. Available: ${availableStock}, Requested: ${product.quantity}`);
            }
          } else {
            console.log(`Product ${product.productName} not found in the database.`);
          }
        }

        // const [ord] = await pool.query(`insert into  Orders (customerID, orderDate) values(?,?)`, [cust.insertId, new Date()]);
        // console.log('Database connection successful:', ord);

        // const [rows] = await pool.query(`insert into  OrderDetails (orderID, productID, quantity) values(?,?,?)`, [ord.insertId, 1, 1]);
        // console.log('Database connection successful:', rows);
    } catch (err) {
        console.error('Database connection failed:', err.message, err.stack);
    }
}