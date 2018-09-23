import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { INFO } from '../utils/constants';
import EmailCapture from './EmailCapture';

class TabSection extends React.Component {
  render() {
    const { small } = this.props;
    return (
      <div>
        <Tabs id="info-tabs" className="font-size-20" defaultActiveKey={2}>
          <Tab eventKey={1} className={small ? "text-container small" : "text-container"} title="About">
            <p>{INFO.P_4}</p>
            <p>{INFO.P_6}</p>
            <p>{INFO.P_4_1}</p>
          </Tab>
          <Tab eventKey={2} className={small ? "text-container small" : "text-container"} title="Join">
            {!small && (
              <Fragment>
                <p>{INFO.P_1}</p>
                <p>{INFO.P_5}</p>
                <EmailCapture />
              </Fragment>
            )}
            {small && (
              <Fragment>
                <p>{INFO.P_1}</p>
                <EmailCapture small />
                <p>{INFO.P_5}</p>
              </Fragment>
            )}
          </Tab>
          <Tab eventKey={3} className={small ? "text-container small" : "text-container"} title="Technology">
            <p>{INFO.P_2}</p>
            <p>{INFO.P_3}</p>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

TabSection.propTypes = {
  small: PropTypes.bool,
};

export default TabSection;
