import React from "react";
import {connect} from "react-redux";
import {Route, Redirect, withRouter} from "react-router-dom";
import Viewer from "./components/Viewer"

class Routes extends React.Component {

    render() {
        return (
            <div>
                <Route path="/:item" exact component={Viewer}/>
                {/*<Route path="/explore/:view" render={() =>*/}
                    {/*this.props.authenticated.authenticated ?*/}
                        {/*<Explore /> :*/}
                        {/*<Redirect to={"/"} />*/}
                {/*}*/}
                {/*/>*/}
            </div>
        )
    }
}

export default withRouter(connect((state) => ({authenticated: state.auth}), null)(Routes))
