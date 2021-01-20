import React from 'react';
import { ReactSVG } from 'react-svg';

import loader from '../../image/loader.svg';
import './style.scss';

export default function(Component) {
  return class extends React.Component {
    render() {
      return (
        <div style={{ position: 'relative' }}>
          {this.props.isFetching && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            >
              <ReactSVG
                className='loader'
                src={loader}
              />
            </div>
          )}
          <Component {...this.props} />
        </div>
      );
    }
  };
}
