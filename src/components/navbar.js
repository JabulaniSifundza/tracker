import {AppBar, Box, Button, Container, Stack, Toolbar, Typography} from '@mui/material';
import styles from '../styles.navbar.module.scss';
import {useAuth} from '../firebase/auth';

export default function NavBar(){
	const {authUser, signOut} = useAuth();

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static" className={styles.appbar}>
				<Toolbar className={styles.toolbar}>
					<Container className={styles.container}>
						<Typography variant="h3" sx={{flexGrow: 1, alignSelf: "center"}}>
							Expense Tracker
						</Typography>
						<Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
							<Typography variant="h6" sx={{flexGrow: 1}}>
								{authUser?.email}
							</Typography>
							<Button variant="text" color="secondary" onClick={signOut}>
								Sign Out
							</Button>
						</Stack>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	)
}