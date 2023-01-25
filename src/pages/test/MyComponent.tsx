
import { makeStyles } from "tss-react/dsfr";
import { useState } from "react";

type Props = {

	className?: string;

};

export function MyComponent(props: Props) {

	const { className } = props;


	const [clickCount, setClickCount] = useState(0);

	const { classes, cx } = useStyles({
		isBigger: clickCount > 3
	});

	return (
		<div className={cx(classes.root, className)} onClick={() => setClickCount(clickCount + 1)} />
	);

}

const useStyles = makeStyles<{ isBigger: boolean; }>()((theme, { isBigger }) => ({
	root: {
		width: isBigger ? 200 : 100,
		height: 100,
		backgroundColor: theme.decisions.background.active.redMarianne.default,
		"&:hover": {
			backgroundColor: theme.decisions.background.active.redMarianne.hover
		},

	}
}));