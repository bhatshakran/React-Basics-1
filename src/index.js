import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonsDisplay from './Components/SeasonsDisplay';
import Spinner from './Components/Spinner';

class App extends Component {
	state = {
		lat: null,
		errMessage: '',
	};

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude });
			},
			err => {
				this.setState({ errMessage: err.message });
			}
		);
	}

	render() {
		if (this.state.errMessage && !this.state.lat) {
			return (
				<div>
					<h2>Error: {this.state.errMessage}</h2>
				</div>
			);
		}

		if (!this.state.errMessage && this.state.lat) {
			return <SeasonsDisplay lat={this.state.lat} />;
		}

		if (!this.state.errMessage && !this.state.lat) {
			return (
				<div>
					<Spinner message={'Please allow the location to use this service!'} />
				</div>
			);
		}
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
