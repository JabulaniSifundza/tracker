import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

const RECEIPTS_COLLECTION = "receipts";
export function addReceipt(uid, date, locationName, address, items, amount, imageBucket){
	addDoc(collection(db, RECEIPTS_COLLECTION),{
		uid, 
		date, 
		locationName, 
		address, 
		items, 
		amount, 
		imageBucket
	});
}


export async function getReceipts(uid){
	const receipts = query(collection(db, RECEIPTS_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
	const querySnapshot = getDocs(receipts);

	let allReceipts = [];
	for(const docSnapshot of querySnapshot.docs){
		const receipt = docSnapshot.data();
		await allReceipts.push({
			...receipt,
			date: receipt['date'].toDate(),
			id: docSnapshot.id,
			imageUrl: await getDownloadURL(receipt['imageBucket'])
		}) 
	}
	return  allReceipts;
}


export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket){
	setDoc(doc(db, RECEIPTS_COLLECTION, docId), {
		uid, date, locationName, address, items, amount, imageBucket
	})
}
