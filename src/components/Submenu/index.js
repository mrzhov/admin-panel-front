import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const propTypes = {
  items: PropTypes.exact({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  onClick: PropTypes.func
};

class Submenu extends Component {
  componentDidMount() {
    window.addEventListener('click', this.closeSubmenu.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeSubmenu.bind(this));
  }

  closeSubmenu = e => {
    const { parentRef, toggleOpen } = this.props;
    if (parentRef.current && !parentRef.current.contains(e.target))
      toggleOpen(false);
  };

  getClassName = () => {
    const { isOpen } = this.props;
    return isOpen ? 'submenu submenu-open' : 'submenu';
  };

  render() {
    const { items, onClick } = this.props;

    return (
      <div className={this.getClassName()}>
        {items.map((item, i) => (
          <div
            className='submenu__item'
            key={`submenu__item-${i}`}
            onClick={onClick(item.params)}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }
}

Submenu.propTypes = propTypes;

export default Submenu;
