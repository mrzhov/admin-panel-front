import React from 'react';
import ReactTooltip from "react-tooltip";
import { ReactSVG } from 'react-svg';

import './style.scss';

import Submenu from '../../components/Submenu';

import questionIcon from './icons/question.svg';
import activateIcon from './icons/activate.svg';
import deleteIcon from './icons/delete.svg';
import editIcon from './icons/edit.svg';
import infoIcon from './icons/info.svg';
import eyeIcon from './icons/eye.svg';
import banIcon from './icons/ban.svg';
import downloadIcon from './icons/download.svg';
import copyIcon from './icons/copy.svg';
import handIcon from './icons/hand.svg';

const icons = {
  question: questionIcon,
  activate: activateIcon,
  delete: deleteIcon,
  edit: editIcon,
  info: infoIcon,
  ban: banIcon,
  eye: eyeIcon,
  download: downloadIcon,
  copy: copyIcon,
  hand: handIcon
};

class TableActions extends React.Component {
  static defaultProps = {
    onClick: () => false
  };

  state = {
    isOpenSubmenu: false
  };

  getItemClassName(cn) {
    if (cn) {
      return `Actions-item ${cn}`;
    }
    return 'Actions-item';
  }

  getItemOnClick(fn) {
    return fn || (() => false);
  }

  toggleSubmenu(value) {
    const isOpenSubmenu =
      typeof value === 'boolean' ? value : !this.state.isOpenSubmenu;
    this.setState({ isOpenSubmenu });
  }

  render() {
    const { items } = this.props;
    const { isOpenSubmenu } = this.state;

    return (
      <div className='Actions'>
        {items.map(item => {
          let itemRef;
          if (item.submenuItems) itemRef = React.createRef();
          return (
              <div
                  className={this.getItemClassName(item.className)}
                  key={item.icon}
                  onClick={
                    item.submenuItems
                        ? this.toggleSubmenu
                        : this.getItemOnClick(item.onClick)
                  }
                  ref={itemRef}
                  data-tip
                  data-for={item.icon}
              >
                <ReactSVG src={icons[item.icon]}/>
                <ReactTooltip id={item.icon} place="top" effect="solid" type='dark'>
                  {item.tooltipText}
                </ReactTooltip>
                {item.submenuItems && (
                    <Submenu
                        isOpen={isOpenSubmenu}
                        items={item.submenuItems}
                        onClick={item.onClick}
                        parentRef={itemRef}
                        toggleOpen={this.toggleSubmenu}
                    />
                )}
              </div>
          );
        })}
      </div>
    );
  }
}

export default TableActions;
