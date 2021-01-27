import React from 'react';
import './App.css';
import Field from '../Field';
import {HotKeys} from 'react-hotkeys';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			fieldData: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			score:0
		};
		this.blankField = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
		this.leftOp = this.leftOp.bind(this)
		this.rightOp = this.rightOp.bind(this)
		this.upOp = this.upOp.bind(this)
		this.downOp = this.downOp.bind(this)

		this.map = {
			'moveLeft': 'left',
			'moveRight': 'right',
			'moveUp': 'up',
			'moveDown':'down'
		  };

		  
		this.handlers = {
			'moveLeft': this.leftOp,
			'moveRight': this.rightOp,
			'moveUp': this.upOp,
			'moveDown': this.downOp
			};
	};
	initGame() {
		let field = this.blankField.map(row => row.slice())
		field = this.addNumber(field)
		field = this.addNumber(field)
		this.setState({
			fieldData: field,
			score:0
		});
		this.forceUpdate();
	};

	addNumber(field) {
		const availableSpot = []
		field.forEach((rowData, x) =>
			rowData.forEach((data, y) => {
				if (!data) availableSpot.push({ x, y })
			})
		);
		const randomSpot = availableSpot[Math.floor(Math.random() * availableSpot.length)]
		field[randomSpot.x][randomSpot.y] = Math.random() < 0.2 ? 4 : 2
		return field
	}
	slide(row) {
		const newRow = row.filter(data => data)
		const zerosArr = Array(4 - newRow.length).fill(0)
		return [...zerosArr, ...newRow]
	};

	combine(row) {
		let a, b
		let score = this.state.score;
		for (let i = 3; i > 0; i--) {
			a = row[i]
			b = row[i - 1]
			if (a === b) {
				score +=2 * a
				row[i] = a + b
				row[i - 1] = 0
			};
		};
		this.setState({score})
		return row
	};


	slideAndCombine(row) {
		row = this.slide(row)
		row = this.combine(row)
		return row
	};

	diffField(field) {
		let isDiff = false
		for (let i = 0; i < field.length; i++) {
			for (let j = 0; j < field.length; j++) {
				if (field[i][j] !== this.state.fieldData[i][j]) {
					isDiff = true
				};
			};
		};
		if(isDiff){
			field = this.addNumber(field)
			this.setState({
				fieldData:field
			});
		};
	};

	flipField(field) {
		return field.map(row => row.reverse())
	};

	transpose(field){
		const newField = this.blankField.map(row => row.slice())
		for(let i = 0; i< field.length; i++){
			for(let j = 0; j < field.length; j++){
				newField[i][j] = field[j][i]
			};
		};
		return newField;
	};

	rightOp(){
		let copyField = this.state.fieldData.map(row => row.slice());
		copyField = copyField.map(row => this.slideAndCombine(row));
		this.diffField(copyField);
	};
	leftOp(){
		let copyField = this.state.fieldData.map(row => row.slice())
		copyField = this.flipField(copyField).map(row => this.slideAndCombine(row))
		copyField = this.flipField(copyField)
		this.diffField(copyField)
	};
	upOp(){
		let copyField = this.state.fieldData.map(row => row.slice())
		copyField = this.transpose(copyField)
		copyField = this.flipField(copyField)
		copyField = copyField.map(row => this.slideAndCombine(row))
		copyField = this.flipField(copyField)
		copyField = this.transpose(copyField)
		this.diffField(copyField)
	};
	downOp(){
		let copyField = this.state.fieldData.map(row => row.slice())
		copyField = this.transpose(copyField)
		copyField = copyField.map(row => this.slideAndCombine(row))
		copyField = this.transpose(copyField)
		this.diffField(copyField)	
	};

	gameOver(){
		let over = true;
		this.state.fieldData.forEach(row => {
			row.forEach(data => {
				if(data === 0) over = false;
			});
		});
		return over
	};

	componentDidMount() {
		this.initGame()
	};

	render() {
		let renderOverlay = ''
		if(this.gameOver()){
			renderOverlay = <div className='overlay'>
								<div className= 'overlay-msg'>
									<h4 className="game_over">Game Over</h4>
								<div className="game_over_score">Your Score:</div>
								<div className="last_score">{this.state.score}</div>
									<button className="game_over_btn" onClick={()=> this.initGame()}>Restart</button>
								</div>
							</div>
		};
		return (
			<HotKeys keyMap={this.map} handlers = {this.handlers}>
				<div className='container'>
					<div className="centerField">
						<header className="header">
							<button className="newGame_btn" onClick={() => this.initGame()}> New Game </button>
							<h4 className="title">2048</h4>
							<div className="score">
								<span className='score-text'>Score: </span>{this.state.score}
							</div>
						</header>
						<main  id="game">
							
							<Field fieldData={this.state.fieldData} />
						</main>
						{renderOverlay}
					</div>
	
				</div>

			</HotKeys>
		)
	};
};

export default App;
