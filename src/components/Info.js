import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { INFO } from '../utils/constants';
import TabSection from './TabSection';

class Info extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Row>
        <Col xs={10} xsOffset={1} className="hidden-xs">
          <TabSection />
        </Col>
        <Col xs={12} className="small hidden-sm hidden-md hidden-lg">
          <TabSection small />
        </Col>

        <Col md={2} mdOffset={1} className="text-left hidden-xs hidden-sm">
          <Button
            bsStyle="link"
            bsSize="large"
            onClick={() => history.goBack()}
          >
            <Glyphicon glyph="arrow-left" /> Back
          </Button>
        </Col>
        <Col md={3} mdOffset={5} className="text-right hidden-xs hidden-sm">
          <Button
            bsStyle="link"
            bsSize="large"
            href={INFO.LINK}
            target="_blank"
          >
            {INFO.WEBSITE}
          </Button>
        </Col>
        <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg">
          <Button
            bsStyle="link"
            bsSize="large"
            href={INFO.LINK}
            target="_blank"
          >
            {INFO.WEBSITE}
          </Button>
        </Col>
        <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg">
          <Button
            bsStyle="link"
            bsSize="large"
            onClick={() => history.goBack()}
          >
            <Glyphicon glyph="arrow-left" /> Back
          </Button>
        </Col>
      </Row>
    );
  }
}

Info.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Info;
