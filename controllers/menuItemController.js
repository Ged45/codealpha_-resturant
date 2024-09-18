
const MenuItem = require('../models/MenuItem');
exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(400).json({error: 
            error.message
        });
    }
};
exports.getMenuItems = async (req, res) => {
    try{
         const menuItems = await
        MenuItem.find();
         res.status(200).json(menuItems);

    } catch (error) {
        res.status(400).json( {error: error.message});
    }
};

// Retrieve a specific menu item by ID
exports.getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search/Filter menu items
exports.searchMenuItems = async (req, res) => {
    try {
        const { query } = req.query; // Assuming query is passed as a query parameter
        const menuItems = await MenuItem.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
                { category: { $regex: query, $options: 'i' } } // Case-insensitive search by category
            ]
        });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get menu items by category
exports.getMenuItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const menuItems = await MenuItem.find({ category: { $regex: category, $options: 'i' } });
        if (menuItems.length === 0) {
            return res.status(404).json({ error: 'No menu items found for this category' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


