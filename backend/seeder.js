import dotenv from 'dotenv';
import colors from 'colors';
import Product from './models/productModel.js';
import Order from './models/OrderModel.js';
import User from './models/userModel.js';
import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB()

const importData = async () => {
    try {
        // First clear the DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert data
        const usersInserted = await User.insertMany(users);
        const adminUser = await usersInserted[0]._id;
        const sampleProducts = products.map((p)=>{
            return {...p, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log(`Data Imported!`.green.inverse);
        process.exit();

    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log(`Data Destroyed!`.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}