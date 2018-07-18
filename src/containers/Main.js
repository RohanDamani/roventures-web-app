import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/es/withRouter';
import connect from 'react-redux/es/connect/connect';
import { Grid, Row } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import ScrollTop from '../components/ScrollTop';
import { authenticateBucket } from '../utils/awsUtil';
import { fetchAlbumList } from '../actions/actions';
import Loader from '../components/Loader';


class Main extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket object using AWS Cognito user pool
    this.bucket = authenticateBucket;
    // fetch the full list of albums from the bucket to populate the Navigation drop down
    this.props.fetchAlbumList(this.bucket);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Navigation />
        <Grid fluid>
          <Row>{children}</Row>
            {/*<Loader />*/}
        </Grid>
        <ScrollTop />
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.array.isRequired,
};

export default withRouter(
  connect(state => ({ state }), {
    fetchAlbumList,
  })(Main),
);
