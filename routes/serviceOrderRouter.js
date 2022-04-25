const router = require('express').Router();
const ServiceOrder = require('../models/serviceOrderModel');
const checkToken = require('../checkToken');
const sendEmail = require('../sendEmail');



// CREATE ORDER
router.post('/', checkToken, async (req, res) => {
    const { user, typeOfOrder, date } = req.body;

    const serviceOrder = new ServiceOrder({
        user,
        typeOfOrder,
        date,   
    })
    try {
        // creating service order
        await ServiceOrder.create(serviceOrder);

        await sendEmail(serviceOrder, 'Created');
        res.status(201).json({message: 'Service Order Created.'})

    } catch (err) {
        res.status(500).json({error: err})
    }
});

// GET ALL ORDERS
router.get('/', checkToken, async (req, res) => {
    const orders = await ServiceOrder.find();
    (orders);
});

router.get('/:id', checkToken, async (req, res) => {
    const serviceOrder = await ServiceOrder.findById(req.params.id);
    if (serviceOrder) {
        res.send(serviceOrder);
    } else {
        res.status(404).send({ message: 'Service Order Not found' });
    }
});

// EDIT ORDER
router.patch('/:id', checkToken, async (req, res) => {

    const id = req.params.id;
    const {user, typeOfOrder, date} = req.body;

    const serviceOrder = {
        user,
        typeOfOrder,
        date,
    }

    try {
        const updatedOrder = await ServiceOrder.updateOne({_id: id}, serviceOrder);
    

        if (updatedOrder.matchedCount === 0) {
           return res.status(422).json({message: 'Service Order Not Found'});
        }

        await sendEmail(serviceOrder, 'Edited');
        res.status(200).json({message: 'Service Order Edited.'})
    } catch (error) {
        res.status(500).json({error: error}); 
    }

});

// DELETE ORDER
router.delete('/:id', checkToken, async (req, res) => {

    const id = req.params.id;

    const serviceOrder = await ServiceOrder.findOne({_id: id});

    if (!serviceOrder) {
        res.status(422).json({message: 'Service Order Not Found.'});
        return
    }
    try {
        
        await ServiceOrder.deleteOne({_id: id});

        await sendEmail(serviceOrder, 'Deleted');
        res.status(200).json({message: 'Service Order Deleted.'})

    } catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router;