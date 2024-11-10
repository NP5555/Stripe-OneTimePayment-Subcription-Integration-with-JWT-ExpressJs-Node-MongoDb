const stripe = require('../config/stripeConfig');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await stripe.customers.list({ limit: 100 });
        const customerIds = customers.data.map(customer => customer.id);

        res.json({
            success: true,
            customerIds: customerIds
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch customer data',
            error: error.message
        });
    }
};

exports.getCustomersWithPlans = async (req, res) => {
    try {
        const customers = await stripe.customers.list({ limit: 10 });
        const customerData = await Promise.all(customers.data.map(async (customer) => {
            const subscriptions = await stripe.subscriptions.list({
                customer: customer.id,
                status: 'all',
                limit: 10
            });

            const planDetails = subscriptions.data.map(subscription => {
                const plan = subscription.items.data[0].plan;
                return {
                    planId: plan.id,
                    nickname: plan.nickname,
                    amount: plan.amount / 100,
                    currency: plan.currency,
                    interval: plan.interval,
                    status: subscription.status,
                    start_date: new Date(subscription.start_date * 1000),
                    current_period_end: new Date(subscription.current_period_end * 1000)
                };
            });

            return {
                customerId: customer.id,
                customerName: customer.name || 'No Name',
                email: customer.email,
                plans: planDetails
            };
        }));

        res.json({ success: true, customers: customerData });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send('Failed to fetch customer data');
    }
};
