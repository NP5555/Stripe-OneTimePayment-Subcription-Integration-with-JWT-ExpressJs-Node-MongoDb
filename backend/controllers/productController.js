const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// eslint-disable-next-line no-unused-vars
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            expand: ['data.default_price'],
            active: true
        });

        res.json({
            success: true,
            products: products.data
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products'
        });
    }
};

exports.getProductPrices = async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
            active: true
        });
        res.json({ success: true, prices: prices.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createCheckoutSession = async (req, res) => {
    try {
        const { priceId, mode } = req.body;

        const session = await stripe.checkout.sessions.create({
            mode: mode,
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return res.json({
            success: true,
            sessionUrl: session.url
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createOneTimeCheckoutSession = async (req, res) => {
    try {
        const { priceId } = req.body;

        if (!priceId) {
            return res.status(400).json({
                success: false,
                error: 'Price ID is required'
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return res.json({
            success: true,
            sessionUrl: session.url
        });
    } catch (error) {
        console.error('Error creating one-time checkout session:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};