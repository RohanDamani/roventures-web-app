import React from 'react'
import { Glyphicon } from "react-bootstrap";
import ScrollToTop from 'react-scroll-up';

class ScrollTop extends React.Component {
    render() {
        return (
            <ScrollToTop
                showUnder={400}
                duration={0}
                style={{ right: 24, bottom: 20 }}
            >
                <div className="scroll-up-button">
                    <Glyphicon glyph="arrow-up" className="scroll-up-icon" />
                </div>
            </ScrollToTop>
        )
    }
}

export default ScrollTop;
