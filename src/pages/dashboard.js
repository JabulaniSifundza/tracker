import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Alert, Button, Container, Dialog, DialogContent, DialogActions, IconButton, Snackbar, Typography, Stack, CircularProgress} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavBar from '../components/navbar';
import ExpenseDialog from '../components/expenseDialog';
import {useAuth} from '../firebase/auth';
import styles from '../styles/dashboard.module.scss';


const ADD_SUCCESS = "Receipt was successfully added!";
const ADD_ERROR = "Receipt was not added successfully";
const EDIT_SUCCESS = "Receipt was successfully updated!";
const EDIT_ERROR = "Receipt was not updated successfuly";
const DELETE_SUCCESS = "Receipt was successfully deleted";
const DELETE_ERROR = "Receipt was not deleted successfully";

//Enum to represent different states of receipts
export const RECEIPTS_ENUM = Object.freeze({
	none: 0,
	add: 1,
	edit: 2,
	delete: 3
})


const SUCCESS_MAP ={
	[RECEIPTS_ENUM.add]:ADD_SUCCESS,
	[RECEIPTS_ENUM.edit]:EDIT_SUCCESS,
	[RECEIPTS_ENUM.delete]:DELETE_SUCCESS
}

const ERROR_MAP = {
	[RECEIPTS_ENUM.add]:ADD_ERROR,
	[RECEIPTS_ENUM.edit]: EDIT_ERROR,
	[RECEIPTS_ENUM.delete]: DELETE_ERROR
}

const Dashboard = () => {
	const {authUser, isLoading} = useAuth();
	const router = useRouter();
	const [action, setAction] = useState(RECEIPTS_ENUM.none);

	//State for loading, setting, deleting and updating receipts
	const [deleteReceipts, setDeleteReceipts] = useState("");
	const [deleteReceiptImageBucket, setDeleteReceiptImageBucket] = useState("");
	const [updateReceipt, setUpdateReceipt] = useState({});

	//Snackbar state
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

	//Listenin gfor auth state changes
	useEffect(()=>{
		if(!isLoading && !authUser){
			router.push('/');
		}
	}, [authUser, isLoading])


	const onResult = async(receiptEnum, isSuccess)=>{
		setSnackbarMessage(isSuccess ? SUCCESS_MAP[receiptEnum] : ERROR_MAP[receiptEnum]);
		isSuccess ? setShowSuccessSnackbar(true) : setShowErrorSnackbar(true);
		setAction(RECEIPTS_ENUM.none);
		if(isSuccess){
			setReceipts(await getReceipts(autUser.uid))
		}
	}

	const onClickAdd = ()=>{
		setAction(RECEIPTS_ENUM.add);
		setUpdateReceipt({})
	}

	const onUpdate = ()=>{
		setAction(RECEIPTS_ENUM.edit);
		setUpdateReceipt(receipt)
	}
	const onClickDelete = () =>{
		setAction(RECEIPTS_ENUM.delete);
		setDeleteReceiptId(id);
		setDeleteReceiptImageBucket(imageBucket);
	}

	const resetDelete = () =>{
		setAction(RECEIPTS_ENUM.none);
		setDeleteReceiptId("")
	}

  return ((!authUser) ? 
  <CircularProgress color="inherit" sx={{marginLeft: '50%', marginTop: '25%'}} />
  :
	<div>
		<Head>
			<title>Expense Tracker</title>
		</Head>

		<NavBar />
		<Container>
			<Snackbar open={showSuccessSnackbar} autoHideDuration={1500} onClose={()=> setShowSuccessSnackbar(false)}
			anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
				<Alert onClose={()=> setShowSuccessSnackbar(false)} severity="success">{snackbarMessage}</Alert>
			</Snackbar>

			<Snackbar open={showErrorSnackbar} autoHideDuration={1500} onClose={()=> setShowErrorSnackbar(false)}
			anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
				<Alert onClose={()=> setShowErrorSnackbar(false)} severity="error">{snackbarMessage}</Alert>
			</Snackbar>

			<Stack direction="row" sx={{paddingTop: "1.5em"}}>
				<Typography variant="h4" sx={{lineHeight: 2, paddingRight: "0.5em"}}>
					Expenses
				</Typography>
				<IconButton aria-label="edit" color="secondary" onClick={onClickAdd} className={styles.addButton}>
					<AddIcon />
				</IconButton>
			
			
			
			</Stack>
		</Container>
	</div>
  )
}

export default Dashboard
