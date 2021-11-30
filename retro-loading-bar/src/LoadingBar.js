import React, { useState, useEffect, useRef } from "react";

import "./LoadingBar.css";

function useIncrement(callback, delay) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		let id = setInterval(() => {
			savedCallback.current();
		}, delay);
		return () => clearInterval(id);
	}, [delay]);
}

function LoadingBar(props) {
	const [loadingbar, setLoadingbar] = useState("▊");
	const [dots, setDots] = useState("    ");

	useIncrement(() => {
		setLoadingbar(loadingbar + "▊");
		if (loadingbar.length > 11) {
			setLoadingbar("▊");
		}
	}, 125);

	useIncrement(() => {
		setDots(dots + ".");
		if (dots.length > 3) {
			setDots("");
		}
	}, 500);

	return (
		<>
			<div className="LoadingBox">
				<div className="LoadingContent">
					<div className="LoadingText">
						<span>Loading</span>
						<span>{dots}</span>
					</div>
					<div className="LoadingBarContainer">
						<div className="LoadingBar">
							<p>{loadingbar}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoadingBar;
