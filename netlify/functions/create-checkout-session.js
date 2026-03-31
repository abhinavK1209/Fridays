const Stripe = require('stripe')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const { items, shippingInfo, successUrl, cancelUrl } = JSON.parse(event.body)

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Friday's ${item.product.name} — ${item.size.label}`,
        },
        unit_amount: Math.round(item.size.price * 100), // cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: shippingInfo?.email || undefined,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        firstName: shippingInfo?.firstName || '',
        lastName:  shippingInfo?.lastName  || '',
        address:   shippingInfo?.address   || '',
        city:      shippingInfo?.city      || '',
        state:     shippingInfo?.state     || '',
        zip:       shippingInfo?.zip       || '',
      },
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err) {
    console.error('Stripe error:', err.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
