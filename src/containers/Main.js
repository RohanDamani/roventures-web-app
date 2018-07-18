import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

class Main extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Navigation />
        {children}
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Main;
