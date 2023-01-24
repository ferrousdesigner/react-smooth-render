import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import StyleMaker from 'stylemaker';
const style = timing => `
.react-smooth-render.hide {
    animation: hide ${timing}ms linear forwards;
}
.react-smooth-render.reveal {
	animation: reveal ${timing}ms linear forwards;
}
.react-smooth-render.invisible {
    display: none;
}
@keyframes hide {
    0 {
      opacity: 1;
    }
    90% {
      opacity: 0;
    }
    100% {
			opacity: 0;
			display: none;
    }
}
@keyframes reveal {
	0% {
		opacity: 0;
	}
	10% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`;
// Add all the styles to the head
export default class SmoothRender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialClass: props.initiallyHidden ? 'initially-invisible' : '',
			anchor: !(props.initiallyHidden || props.hidden),
		};
	}
	componentDidMount() {
		const { timing } = this.props;
		if (!document.getElementById('react-smooth-render-styles')) {
			StyleMaker(style(timing), 'react-smooth-render-styles', true);
		}
	}
	componentDidUpdate(nextProps) {
		const { initialClass, anchor } = this.state
		const { hidden, timing } = nextProps
		if (initialClass === 'initially-invisible') {
			if (hidden) {
				this.setState({ initialClass: '' });
				setTimeout(() => {
					this.setState({ anchor: false });
				}, timing);
			} else {
				this.setState({ initialClass: '', anchor: true });
			}
		} else if ((hidden && anchor) || (!hidden && anchor)) {
			setTimeout(() => {
				this.setState({ anchor: false });
			}, timing);
		} else if (!hidden && !anchor) {
			this.setState({ anchor: true });
		}
	}
	render() {
		const { children, hidden, initiallyHidden } = this.props;
		const { anchor, initialClass } = this.state;
		return (
			<Fragment>
				{anchor && (
					<div
						className={
							'react-smooth-render' +
							(initiallyHidden ? ` ${initialClass}` : '') +
							(hidden ? ' hide' : ' reveal')
						}
					>
						{children}
					</div>
				)}
			</Fragment>
		);
	}
}
SmoothRender.defaultProps = {
	children: null,
	hidden: false,
	initiallyHidden: false,
	timing: 250,
};
SmoothRender.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	hidden: PropTypes.bool.isRequired,
	initiallyHidden: PropTypes.bool,
	timing: PropTypes.number,
};
