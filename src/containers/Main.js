import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/es/withRouter';
import connect from 'react-redux/es/connect/connect';
import { Grid } from 'react-bootstrap';
import { PATH } from '../utils/constants';
import Navigation from '../components/Navigation';
import ScrollTop from '../components/ScrollTop';
import { authenticatePhotoBucket } from '../utils/awsUtil';
import { fetchAlbumList } from '../actions/actions';
import ViewMore from '../components/ViewMore';

class Main extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket object using AWS Cognito user pool
    this.bucket = authenticatePhotoBucket;
    // fetch the full list of albums from the bucket to populate the Navigation drop down
    this.props.fetchAlbumList(this.bucket);
  }

  render() {
    const { children, history } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <Grid fluid>{children}</Grid>
        {this.props.location.pathname !== PATH.INFO && <ViewMore history={history} />}
        <ScrollTop />
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => ({ state }), {
    fetchAlbumList,
  })(Main),
);
