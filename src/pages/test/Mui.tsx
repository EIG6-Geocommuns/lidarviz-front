
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useStyles } from "tss-react/dsfr";



export function Mui() {

	const { css } = useStyles();

	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert
				classes={{
					message: css({ border: "1px solid red" })
				}}
				severity="error">This is an error alert — check it out!</Alert>
			<Alert severity="warning">This is a warning alert — check it out!</Alert>
			<Alert severity="info">This is an info alert — check it out!</Alert>
			<Alert severity="success">This is a success alert — check it out!</Alert>
		</Stack>
	);

}