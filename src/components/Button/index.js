import React, {Component} from 'react';

import './index.scss';

export default class Button extends Component {
  static defaultProps = {
    variant: 'normal'
  };

  getClassName() {
    let className = 'button';
    if (this.props.disabled) className += ' disabled';
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.isPrimary) className += ' is-primary';
    if (this.props.variant) className += ` ${this.props.variant}`;

    return className;
  }

  render() {
    const { children, label, isDiv, ...props } = this.props;

    if (isDiv) {
      return (
        <div
          {...props}
          className={this.getClassName()}
        >
          {children || label}
        </div>
      );
    }

    return (
      <button
          {...props}
          className={this.getClassName()}
          onClick={this.props.onClick}
      >
        {children || label}
      </button>
    );
  }
}
