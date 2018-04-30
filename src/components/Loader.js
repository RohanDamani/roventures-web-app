import React from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

class Loader extends React.Component {
  render() {
    return (
      <Col xs={12} className="text-center column-padding-top">
        <BeatLoader loading={this.props.loading} color={'#5DCEE0'} />
      </Col>
    );
  }
}

export default Loader;
