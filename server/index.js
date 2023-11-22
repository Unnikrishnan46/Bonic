const express = require("express");
const app = express()

const cors = require("cors")
const port = 5252
const { resolve } = require("path");
app.use(cors())
const env = require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html")
    res.send(path);
})

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLICHABLE_KEY,
    });
});

app.post("/create-payment-intent", async (req, res) => {
    const orderData = req.body
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth()+1;
    const currentDay = currentDate.getDate();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${currentDay}/${currentMonth}/${currentYear}`
    const formattedTime = `${hours}/${minutes}/${seconds} ${amOrPm}`


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            description: '3% of your purchase goes toward our ocean cleanup effort!',
            shipping: {
                name: orderData.orderUserData.addressOne.checkoutName,
                address: {
                    line1: orderData.orderUserData.addressOne.checkoutAddress,
                    postal_code: orderData.orderUserData.addressOne.checkoutPincode,
                    city: orderData.orderUserData.addressOne.checkoutCityDistrictTown,
                    state: orderData.orderUserData.addressOne.checkoutState,
                    country: 'US',
                },
            },
            amount: orderData.totalPayable,
            receipt_email: orderData.userEmail,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        });

        const customer = await stripe.customers.create({
            email: orderData.userEmail,
            name: orderData.orderUserData.addressOne.checkoutName,
            payment_method: 'pm_card_visa',
            invoice_settings: {
                default_payment_method: 'pm_card_visa',
            },
        });

        const orderInformation = {
            userId: orderData.userId,
            address: orderData.orderUserData.addressOne,
            product: orderData.orderProductData,
            totalPayablePrice: orderData.totalPayable,
            paymentMethod:"net_banking",
            paymentStatus:"Order Confirmed",
            cancelled:false,
            date:formattedDate,
            time:formattedTime
        }
        res.send({ clientSecret: paymentIntent.client_secret, orderInformation: orderInformation })
    } catch (error) {
        return res.status(400).send({
            error: {
                message: error.message
            }
        })
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})