import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import { ABOUT } from '../utils/constants';

class About extends React.Component {
  render() {
    const { history, isShowingAboutSection } = this.props;
    return (
      <div>
        {isShowingAboutSection() && (
          <div>
            <Col xs={10} xsOffset={1} className="text-container hidden-xs">
              <p>{ABOUT.P_1}</p>
              <p>{ABOUT.P_2}</p>
              <p>{ABOUT.P_3}</p>
              <p>{ABOUT.P_4}</p>
              {/*<p>{ABOUT.P_5}</p>*/}
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-container small hidden-sm hidden-md hidden-lg"
            >
              <p>{ABOUT.P_1}</p>
              <p>{ABOUT.P_2}</p>
              <p>{ABOUT.P_3}</p>
              <p>{ABOUT.P_4}</p>
              {/*<p>{ABOUT.P_5}</p>*/}
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
                href={ABOUT.LINK}
                target="_blank"
              >
                {ABOUT.WEBSITE}
              </Button>
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-center hidden-md hidden-lg"
            >
              <Button
                bsStyle="link"
                bsSize="large"
                href={ABOUT.LINK}
                target="_blank"
              >
                {ABOUT.WEBSITE}
              </Button>
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-center hidden-md hidden-lg"
            >
              <Button
                bsStyle="link"
                bsSize="large"
                onClick={() => history.goBack()}
              >
                <Glyphicon glyph="arrow-left" /> Back
              </Button>
            </Col>
          </div>
        )}
      </div>
    );
  }
}

About.propTypes = {
  history: PropTypes.object.isRequired,
};

export default About;
