const mongoose = require('mongoose');
const Inventory = require('./models/Inventory'); 
const MenuItem = require('./models/MenuItem'); 
const Order = require('./models/Order'); 
const Reservation = require('./models/Reservation'); 

const uri = 'mongodb://localhost:27017/restaurant'; // or your MongoDB Atlas URI

async function insertSampleData() {
    try {
        await mongoose.connect(uri);

        // Insert sample data into Inventory collection
        const inventoryItems = [
            { itemName: "Tomatoes", quantity: 100, unitPrice: 0.5 },
            { itemName: "Cheese", quantity: 50, unitPrice: 1.0 },
            { itemName: "Chicken Breast", quantity: 30, unitPrice: 3.5 },
            { itemName: "Lettuce", quantity: 80, unitPrice: 0.3 },
            { itemName: "Pasta", quantity: 60, unitPrice: 1.2 }
        ];

        await Inventory.insertMany(inventoryItems);
        console.log("Inventory data inserted successfully!");


        
      

        // Insert sample data into MenuItem collection
        const menuItems = [
            {
                name: "Margherita Pizza",
                price: 10.99,
                description: "Classic pizza topped with fresh mozzarella and basil.",
                category: "Pizza",
                available: true
            },
            {
                name: "Caesar Salad",
                price: 8.99,
                description: "Crisp romaine lettuce with Caesar dressing.",
                category: "Salad",
                available: true
            },
            {
                name: "Grilled Chicken",
                price: 12.99,
                description: "Juicy grilled chicken served with seasonal vegetables.",
                category: "Main Course",
                available: true
            },
            {
                name: "Spaghetti Bolognese",
                price: 11.99,
                description: "Classic Italian pasta dish with rich meat sauce.",
                category: "Pasta",
                available: true
            },
            {
                name: "Chocolate Cake",
                price: 6.99,
                description: "Rich and moist chocolate cake.",
                category: "Dessert",
                available: true
            }
        ];

        await MenuItem.insertMany(menuItems);
        console.log("Menu items inserted successfully!");

        // Insert sample data into Order collection
        const orders = [
            {
                tableNumber: 1,
                items: [menuItems[0]._id, menuItems[1]._id], // Assuming menuItems have been inserted and their IDs are available
                status: 'Pending'
            },
            {
                tableNumber: 2,
                items: [menuItems[2]._id, menuItems[3]._id],
                status: 'Completed'
            },
            {
                tableNumber: 3,
                items: [menuItems[1]._id, menuItems[4]._id],
                status: 'Cancelled'
            }
        ];

        await Order.insertMany(orders);
        console.log("Orders inserted successfully!");

        // Insert sample data into Reservation collection
        const reservations = [
            {
                name: "John Doe",
                dateTime: new Date("2023-10-01T19:00:00Z"),
                partySize: 4,
               
                contactInfo: "johndoe@example.com"
            },
            {
                name: "Alice Smith",
                dateTime: new Date("2023-10-02T20:00:00Z"),
                partySize: 2,
            
                contactInfo: "alice.smith@example.com"
            },
            {
                name: "Bob Johnson",
                dateTime: new Date("2023-10-03T18:30:00Z"),
                partySize: 6,
            
                contactInfo: "bob.johnson@example.com"
            }
        ];

        await Reservation.insertMany(reservations);
        console.log("Reservations inserted successfully!");

    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await mongoose.connection.close();
    }
}

insertSampleData();
