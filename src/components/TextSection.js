import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import { ABOUT, VIEWER } from '../utils/constants';

class TextSection extends React.Component {
  oppositeOfShowingType() {
    if (this.isShowingPhotos()) {
      return VIEWER.VIDEOS;
    }
    return VIEWER.PHOTOS;
  }

  render() {
    const { history, toggleShowType } = this.props;
    return (
      <div>
        <Col xs={10} xsOffset={1} className="text-container hidden-xs">
          <p>
            {this.isShowingPhotos ? VIEWER.NO_VIDEOS : VIEWER.NO_PHOTOS}
            <Button
              bsStyle="link"
              bsSize="large"
              onClick={() => toggleShowType(VIEWER.PHOTOS)}
            >
              {this.oppositeOfShowingType()}
            </Button>
          </p>
        </Col>
        <Col
          xs={10}
          xsOffset={1}
          className="text-container small hidden-sm hidden-md hidden-lg"
        >
            <p>
                {this.isShowingPhotos ? VIEWER.NO_VIDEOS : VIEWER.NO_PHOTOS}
                <Button
                    bsStyle="link"
                    bsSize="large"
                    onClick={() => toggleShowType(VIEWER.PHOTOS)}
                >
                    {this.oppositeOfShowingType()}
                </Button>
            </p>
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
        <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg">
          <Button
            bsStyle="link"
            bsSize="large"
            href={ABOUT.LINK}
            target="_blank"
          >
            {ABOUT.WEBSITE}
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
      </div>
    );
  }
}

TextSection.propTypes = {
  history: PropTypes.object.isRequired,
};

export default TextSection;
