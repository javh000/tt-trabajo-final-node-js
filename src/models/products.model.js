import { db } from "../data/data.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];

  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getProductById = async (id) => {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) {
    return {id, ...productDoc.data()};
  } else {
    return null;
  }
};

export const saveProduct = async ({ name, price, category }) => {
  const docRef = await addDoc(productsCollection, { name, price, category });

  return {
    id: docRef.id,
    name,
    price,
    category,
  };
};

export const updateProduct = async ({ id, name, price, category }) => {
  const productRef = doc(productsCollection, id);
  const productDoc = await getDoc(productRef);
  
  if (!productDoc.exists()) {
    return null;
  }
  
    await updateDoc(productRef, {
    name,
    price,
    category
  });

  return { id, name, price, category };
};

export const deleteProduct = async (id) => {
  const productRef = doc(productsCollection, id);
  const productDoc = await getDoc(productRef);
  
  if (!productDoc.exists()) {
    return null;
  }
  await deleteDoc(productRef);
  return { id, ...productDoc.data() };
};
