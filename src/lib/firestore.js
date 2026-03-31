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
  if (!db) return 'local'

  const timestamp = serverTimestamp()

  const userRef = collection(db, 'users', uid, 'orders')
  await addDoc(userRef, { ...orderData, uid, createdAt: timestamp })

  const adminRef = collection(db, 'orders')
  const doc = await addDoc(adminRef, { ...orderData, uid, createdAt: timestamp })
  return doc.id
}

export async function getUserOrders(uid) {
  if (!db) return []

  const ref = collection(db, 'users', uid, 'orders')
  const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')))
  return snapshot.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }))
}

export async function getAllOrders() {
  if (!db) return []

  const ref = collection(db, 'orders')
  const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')))
  return snapshot.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }))
}
