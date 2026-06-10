import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAom5Z3Jvrk0OqTS4CUDzG8ZJROGJjq1pA",
    authDomain: "raspberry-sim.firebaseapp.com",
    projectId: "raspberry-sim",
    storageBucket: "raspberry-sim.firebasestorage.app",
    messagingSenderId: "1063312398246",
    appId: "1:1063312398246:web:2a40a2c864edfdcce1a167",
    measurementId: "G-1LWDHXQYVX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export function trackPageView(path: string) {
    logEvent(analytics, 'page_view', { page_path: path });
}
