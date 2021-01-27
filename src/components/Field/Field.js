import React from 'react';
import Box from '../Box';
import './Field.css';

export default class Field extends React.Component {
	render() {
		const { fieldData } = this.props;
		const dimension = {
			height: `${4 * 100 + 25}px`,
			width: `${4 * 100 + 25}px`,
		};
		let boxes = [];
		fieldData.forEach((rowData, rIndex) => {
			boxes.push(
				rowData.map((data, cIndex) => {
					return (
						<div key={`${rIndex}-${cIndex}`}>
							<Box id={`${rIndex}-${cIndex}`} data={data} />
						</div>
					)
				})
			);
		});
		return (
			<div className="Field" style={dimension}>
				<div className="Field-plant">{boxes}</div>
			</div>
		);
	};
};
