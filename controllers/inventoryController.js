// import Inventory from '../models/Inventory';


const Inventory = require('../models/Inventory');
exports.createInventoryItem = async (req, res) => {
    try {
        const inventoryitem = new Inventory(req.body);
        await inventoryitem.save();
        res.status(201).json(inventoryitem);
    } catch (error) {
        res.status(400).json({error: 
            error.message
        });
    }
};
exports.getInventoryItems = async (req, res) => {
    try{
         const inventoryitems = await
        Inventory.find();
         res.status(200).json(inventoryitems);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Retrieve a specific inventory item by ID
exports.getInventoryItemById = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing inventory item
exports.updateInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search/Filter inventory items
exports.searchInventoryItems = async (req, res) => {
    try {
        const { query } = req.query; // Assuming query is passed as a query parameter
        const inventoryItems = await Inventory.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
                { category: { $regex: query, $options: 'i' } } // Case-insensitive search by category
            ]
        });
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Check stock levels for a specific item
exports.checkStockLevel = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ stockLevel: inventoryItem.stockLevel }); // Assuming stockLevel is a field in the model
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




