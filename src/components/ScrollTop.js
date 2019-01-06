import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Glyphicon } from 'react-bootstrap';
import window from 'window-or-global';
import withRouter from 'react-router-dom/es/withRouter';
import { updateShowScrollTop } from '../actions/actions';
import { VIEWER } from '../utils/constants';

class ScrollTop extends React.Component {
  componentDidMount() {
    window.addEventListener(VIEWER.SCROLL, this.handleScroll);
  }

  handleScroll = () => {
    const { showScrollTop, updateShowScrollTop } = this.props;
    if (window.scrollY > 800 && !showScrollTop) {
      updateShowScrollTop(true);
    }
    if (window.scrollY < 800 && showScrollTop) {
      updateShowScrollTop(false);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.showScrollTop && (
          <button onClick={() => window.scrollTo(0, 0)}>
            <div className="scroll-up-button">
              <Glyphicon glyph="arrow-up" className="scroll-up-icon" />
            </div>
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(state => ({ showScrollTop: state.showScrollTop }), {
    updateShowScrollTop,
  })(ScrollTop),
);
