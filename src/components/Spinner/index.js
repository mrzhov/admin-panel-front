import React from 'react';
import { ReactSVG } from 'react-svg';

import loader from '../../image/loader.svg';

import './style.scss';

const Spinner = () => <ReactSVG
  className='spinner'
  src={loader}
/>;

export default Spinner;
