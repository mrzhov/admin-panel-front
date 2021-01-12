import React from 'react';

import './style.scss';

export default class extends React.Component {
  static defaultProps = {
    onChange: () => {},
    onClick: () => {}
  };

  getClassName() {
    let className = 'checkbox';
    if (this.props.className) className += ` ${this.props.className}`;
    return className;
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.props.style}
      >
        <input
          checked={this.props.value}
          className='checkbox__input'
          disabled={this.props.disabled}
          id={this.props.label || ''}
          onChange={this.props.onChange}
          readOnly={this.props.readOnly}
          type='checkbox'
        />
        {this.props.label && (
          <label
            className='checkbox__label'
            htmlFor={this.props.label}
          >
            {this.props.label}
          </label>
        )}
      </div>
    );
  }
}
