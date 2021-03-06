import React from 'react';
import './Box.css';

const styles = {
	extraSmall:{
		fontSize:'40px',
		backgroundColor:'#588D9C'
	},
	small:{
		fontSize:'50px',
		backgroundColor:'#FDA831'
	},
	medium:{
		fontSize:'55px',
		backgroundColor:"#ED8D8D"
	},
	large:{
		fontSize:'60px',
		backgroundColor:'#f8f7f7'
	},
};
export default class Box extends React.Component {

	pickSize(data){
		console.log(data)
		if(data.toString().length > 2){
			return styles.small
		};
		if(data.toString().length >1){
			return styles.medium
		};
		if(data >= 2) return styles.large
	};
	render() {
		const { data } = this.props
		const mStyle = this.pickSize(data)
		console.log(mStyle)
		return <div className="Box" style={mStyle}>{data > 0 ? data : ''}</div>
	};
};
