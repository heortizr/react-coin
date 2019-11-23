import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ width, height }) => (
  <div className="Loading" style={{ width, height }}></div>
);

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Loading.defaultProps = {
  width: '28px',
  height: '28px',
};

export default Loading;
