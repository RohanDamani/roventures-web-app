import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from './Navigation';
import authenticateBucket from '../bucketUtil'
import {fetchAlbumList} from "../actions/actions";

class MainComponent extends React.Component {
  componentDidMount() {
    this.bucket = authenticateBucket;
    this.props.fetchAlbumList(this.bucket);
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({ state: state }), {
    fetchAlbumList
  })(MainComponent),
);
