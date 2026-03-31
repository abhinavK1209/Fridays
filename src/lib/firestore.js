import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function saveOrder(uid, orderData) {
  const ts = serverTimestamp()

  const userRef = collection(db, 'users', uid, 'orders')
  await addDoc(userRef, { ...orderData, uid, createdAt: ts })

  const adminRef = collection(db, 'orders')
  const doc = await addDoc(adminRef, { ...orderData, uid, createdAt: ts })
  return doc.id
}

export async function getUserOrders(uid) {
  const ref  = collection(db, 'users', uid, 'orders')
  const q    = query(ref, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }))
}

export async function getAllOrders() {
  const ref  = collection(db, 'orders')
  const q    = query(ref, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }))
}
