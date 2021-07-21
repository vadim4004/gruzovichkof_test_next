import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { useStyles } from '../styles/styles';

export default function Page({ id, options, count, color, data, serverLog }) {
	return (
    <>
		<MyWonderfulComponent
			id={id}
			options={options}
			count={count}
			color={color}
			data={data}
      serverLog={serverLog}
		>
			{/*  eslint-disable-next-line react/no-unescaped-entities */}
			I'm text from a component
		</MyWonderfulComponent>
    </>
	);
}

function MyWonderfulComponent({ id, options, children, serverLog, ...other }) {
	const { count } = other;
	const [summ, setSumm] = useState(count);

	const classes = useStyles();

	useEffect(() => {
		if (id && options?.params?.fields?.isDynamic) {
			setSumm(summ + 1);
		}
	}, [id, options?.params?.fields?.isDynamic, summ]);

	return (
		<>
			<h1 className={classes.header}>Hello World!</h1>
			<Grid>
				<Grid xs={12} item={true}>
					{children}
				</Grid>
				<Grid>{summ}</Grid>
        <Grid>{serverLog}</Grid>
			</Grid>
		</>
	);
}

export async function getStaticProps(context) {
  const serverLog = 'Hello from SSR'
  console.log(serverLog)
  return {
    props: {serverLog}, // will be passed to the page component as props
  }
}