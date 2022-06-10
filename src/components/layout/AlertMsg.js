import React from "react";
import { Alert } from "react-bootstrap";
const AlertMsg = ({ info }) => {
	return info ? (
		<Alert style={{ textTransform: "uppercase" }} variant={info.type}>
			{info.message}
		</Alert>
	) : null;
};

export default AlertMsg;
