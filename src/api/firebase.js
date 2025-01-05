import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

provider.setCustomParameters({ prompt: 'select_account' });

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}
export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(child(ref(database), `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        console.log('No data available');
        return user;
      }
    })
    .catch((error) => {
      console.error('Error fetching admin data:', error);
      throw error;
    });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(child(ref(database), `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return Object.values(snapshot.val());
      } else {
        console.log('No data available');
        return [];
      }
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      throw error;
    });
}
export async function gettttProducts() {
  return get(child(ref(database), 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return Object.values(snapshot.val());
    } else {
      console.log('No data available');
      return [];
    }
  });
}
