import React from "react";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router-dom";
import Viewer from "../containers/Viewer"

class Routes extends React.Component {

    render() {
        return (
            <div>
                <Route path="/:item" exact component={Viewer}/>
            </div>
        )
    }
}

export default withRouter(connect((state) => ({authenticated: state.auth}), null)(Routes))
