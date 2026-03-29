import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sanitize } from '@/lib/email'

// Sanitize an order object before writing to Firestore
function sanitizeOrder(order) {
  return {
    ...order,
    orderId:  sanitize(order.orderId  || '', 50),
    status:   sanitize(order.status   || '', 50),
    shipping: order.shipping ? {
      firstName: sanitize(order.shipping.firstName || '', 100),
      lastName:  sanitize(order.shipping.lastName  || '', 100),
      email:     sanitize(order.shipping.email     || '', 200),
      phone:     sanitize(order.shipping.phone     || '', 30),
      address:   sanitize(order.shipping.address   || '', 300),
      apt:       sanitize(order.shipping.apt       || '', 100),
      city:      sanitize(order.shipping.city      || '', 100),
      state:     sanitize(order.shipping.state     || '', 10),
      zip:       sanitize(order.shipping.zip       || '', 20),
    } : null,
    subtotal: Number(order.subtotal) || 0,
    total:    Number(order.total)    || 0,
  }
}

// Save order under users/{uid}/orders AND top-level orders/ (for admin view)
export async function saveOrder(uid, orderData) {
  const clean = sanitizeOrder(orderData)
  const ts    = serverTimestamp()

  // User-scoped
  const userRef = collection(db, 'users', uid, 'orders')
  await addDoc(userRef, { ...clean, uid, createdAt: ts })

  // Top-level for admin
  const adminRef = collection(db, 'orders')
  const doc = await addDoc(adminRef, { ...clean, uid, createdAt: ts })
  return doc.id
}

// Fetch all orders for a user, newest first
export async function getUserOrders(uid) {
  const ref  = collection(db, 'users', uid, 'orders')
  const q    = query(ref, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }))
}

// Admin only — fetch all orders across all users, newest first
export async function getAllOrders() {
  const ref  = collection(db, 'orders')
  const q    = query(ref, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }))
}
