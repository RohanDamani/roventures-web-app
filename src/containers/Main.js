import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { fetchAlbumList } from '../actions/actions';
import { MAIN } from '../utils/constants';

class Main extends React.Component {
  componentWillMount() {
    const { history, location } = this.props;

    // check to see if a route was provided otherwise add INITIAL_ALBUM
    if (location.pathname === '/') {
      history.push(MAIN.INITIAL_ALBUM );
    }

  }


  // if the album is updated in state, push it to react router
  // everything in the app should watch showInViewer.album for location
  componentWillUpdate(nextProps) {
    const { showInViewer, history } = this.props;
    if (showInViewer.album !== nextProps.showInViewer.album) {
      history.push(`/${nextProps.showInViewer.album}`)
    }
  }

  // children are passed from Routes.js to render a particular album in the Viewer component
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
  fetchAlbumList: PropTypes.func.isRequired,
};

export default withRouter(
  connect(state => ({ showInViewer: state.showInViewer }), {
    fetchAlbumList,
  })(Main),
);
