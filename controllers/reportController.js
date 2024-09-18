
   const Order = require('../models/Order');
   const Inventory = require('../models/Inventory');
   const Reservation = require('../models/Reservation');

   // Get total orders report
   exports.getOrderReport = async (req, res) => {
       try {
           const totalOrders = await Order.countDocuments();
           const totalRevenue = await Order.aggregate([
               { $group: { _id: null, total: { $sum: "$totalPrice" } } }
           ]);
           res.status(200).json({ totalOrders, totalRevenue: totalRevenue[0]?.total || 0 });
       } catch (error) {
           res.status(400).json({ error: error.message });
       }
   };

   // Get inventory report
   exports.getInventoryReport = async (req, res) => {
       try {
           const inventoryItems = await Inventory.find();
           res.status(200).json(inventoryItems);
       } catch (error) {
           res.status(400).json({ error: error.message });
       }
   };

   // Get reservations report
   exports.getReservationReport = async (req, res) => {
       try {
           const totalReservations = await Reservation.countDocuments();
           res.status(200).json({ totalReservations });
       } catch (error) {
           res.status(400).json({ error: error.message });
       }
   };
   
