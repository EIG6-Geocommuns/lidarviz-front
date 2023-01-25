import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { MyComponent } from "./MyComponent";
import { makeStyles } from "tss-react/dsfr";



export function Home() {
	const { isDark, setIsDark } = useIsDark();

	const { classes } = useStyles();

	return (
		<>
			<Alert
				closable
				severity="success"
				title="Success: This is the title"
				description="This is the description"
			/>

			<CallOut
				buttonProps={{
					children: 'Label bouton MD',
					onClick: function noRefCheck() { }
				}}
				iconId="ri-information-line"
				title="C'est super"
			>
				Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à
				accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires
				qui remplissent les conditions.
			</CallOut>

			<button className={fr.cx("fr-btn", "fr-icon-checkbox-circle-line", "fr-btn--icon-left")}>
				Label bouton MD
			</button>
			<span className="fr-icon-ancient-gate-fill" aria-hidden="true"></span>
			<i className="fr-icon-ancient-gate-fill" aria-hidden="true" />

			<button className={fr.cx("fr-btn", "ri-24-hours-fill", "fr-btn--icon-left")}>
				Download
			</button>

			<h1>Color Scheme: {isDark ? "dark" : "light"}</h1>
			<button onClick={() => setIsDark(true)}>Set color scheme to dark</button>
			<button onClick={() => setIsDark(false)}>Set color scheme to light</button>
			<button onClick={() => setIsDark("system")}>Set color scheme to system</button>

			<MyComponent className={classes.myComponent}/>

		</>
	);
}


const useStyles = makeStyles()({
	myComponent: {
				marginTop: fr.spacing("15v")
	}
});