// ─────────────────────────────────────────────────────────────────────────────
// STRIPE INTEGRATION STUB
// ─────────────────────────────────────────────────────────────────────────────
// To enable real payments:
//
// 1. npm install @stripe/react-stripe-js @stripe/stripe-js
//
// 2. Replace PUBLISHABLE_KEY below with your Stripe publishable key:
//    const stripePromise = loadStripe('pk_live_...')
//
// 3. In CheckoutPage.jsx, wrap the payment step with:
//    <Elements stripe={stripePromise} options={{ clientSecret }}>
//      <PaymentForm />
//    </Elements>
//
// 4. In your PaymentForm, replace the mock card fields with:
//    import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
//    <CardElement options={CARD_ELEMENT_OPTIONS} />
//
// 5. On form submit:
//    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//      payment_method: { card: elements.getElement(CardElement) }
//    })
//
// 6. Your backend (Node/Edge function) needs to create a PaymentIntent and
//    return the clientSecret:
//    const paymentIntent = await stripe.paymentIntents.create({
//      amount: Math.round(subtotal * 100), // in cents
//      currency: 'usd',
//      automatic_payment_methods: { enabled: true },
//    })
// ─────────────────────────────────────────────────────────────────────────────

// export { loadStripe } from '@stripe/stripe-js'
// export const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY')

/**
 * Mock payment processor — replace with real Stripe call.
 * Returns a promise that resolves after a simulated network delay.
 */
export async function processPayment({ amount, cardDetails, shippingInfo }) {
  console.log('[Stripe stub] Processing payment', { amount, shippingInfo })
  // Simulate network latency
  await new Promise(r => setTimeout(r, 1800))
  // Simulate success (replace with real stripe.confirmCardPayment)
  return { success: true, paymentIntentId: `pi_mock_${Date.now()}` }
}

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents)
}
