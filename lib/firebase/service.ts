import bcrypt from "bcrypt";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./client";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

type SignUpCallback = { status: boolean; message: string };
export async function signUp(userData: userData): Promise<SignUpCallback> {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email),
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { status: false, message: "Email already exist" };
    }

    if (!userData.password) {
      return { status: false, message: "Password require" };
    }

    if (userData.password !== userData.confirmPassword) {
      return {
        status: false,
        message: "Confirm Password doesn't match with Password",
      };
    }

    const hashedPass = await bcrypt.hash(userData.password, 10);

    const { confirmPassword, ...restUserData } = userData;

    const newUserData = {
      ...restUserData,
      password: hashedPass,
      role: "member",
    };

    await addDoc(collection(firestore, "users"), newUserData);

    return { status: true, message: "Register Successs" };
  } catch {
    return {
      status: false,
      message: "Register Failed",
    };
  }
}

export async function signIn(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}
