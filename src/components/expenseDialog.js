import {useState, useEffect} from 'react';
import styles from '../styles/expenseDialog.module.scss';
import {Avatar, Button, Dialog, DialogActions, Stack, TextField, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const DEFAULT_FILE_NAME = "No file selected";
//Default form state for the dialog
const DEFAULT_FORM_STATE ={
	fileName:  DEFAULT_FILE_NAME,
	file: null,
	date: null,
	locationName: "",
	address: "",
	items: "",
	amount: "",
}

export default function ExpenseDialog(props){
	const isEdit = Object.keys(props.edit).length > 0;
	const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(()=>{
		if(props.showDialog){
			setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
		}
	}, [props.edit, props.showDialog])

	const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME || !formFields.date ||formFields.locationName === 0 || formFields.address.length === 0 || formFields.items.length === 0 ||
	formFields.amount.length === 0;

	const updateFormField = (event, field) =>{
		setFormFields(prevState =>({...prevState, [field]: event.target.value}))
	}

	const setFieldData = (target) =>{
		const file = target.files[0];
		setFormFields(prevState =>({...prevState, fileName: file.name}));
		setFormFields(prevState =>({...prevState, file}));

	}

	const closeDialog = () =>{
		setIsSubmitting(false);
		props.onCloseDialog();
	}


	return (
		<Dialog>
		
		
		
		
		</Dialog>
	)

}