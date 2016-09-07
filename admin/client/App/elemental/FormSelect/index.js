import { StyleSheet, css } from 'aphrodite/no-important';
import React, { Component, PropTypes } from 'react';

import styles from './styles';

const classes = StyleSheet.create(styles);

class FormSelect extends Component {
	render () {
		const { children, id, options, ...props } = this.props;
		const { formFieldId } = this.context;

		props.className = css(
			classes.select,
			props.disabled ? classes['select--disabled'] : null
		);
		props.id = id || formFieldId;

		// allow an array of options or children
		if (options && children) {
			console.error('Error: `FormSelect` accepts either `children` or `options`, but not both.');
			return null;
		}

		return (
			<div className={css(classes.container)}>
				{options ? (
					<select {...props}>{options.map(opt => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
					</select>
				) : <select {...props}>{children}</select>}
				<span className={css(classes.arrows, props.disabled ? classes['arrows--disabled'] : null)}>
					<span className={css(classes.arrow, classes.arrowTop)} />
					<span className={css(classes.arrow, classes.arrowBottom)} />
				</span>
			</div>
		);
	}
};

FormSelect.contextTypes = {
	formFieldId: PropTypes.string,
};
FormSelect.propTypes = {
	onChange: PropTypes.func.isRequired,
	options: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			label: React.PropTypes.string,
			value: React.PropTypes.string,
		})
	),
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
};

module.exports = FormSelect;