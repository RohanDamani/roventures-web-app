import React from "react";
import MediaQuery from "react-responsive";
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Col, Row, DropdownButton, MenuItem} from "react-bootstrap";


const ButtonSection = (props) => {

    const styles = {
        label: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0px',
            paddingTop: '0px',
            letterSpacing: '0px',
            fontSize: '18px',
            fontWeight: '400',
            color: 'rgb(255, 255, 255)',
            height: '64px',
            lineHeight: '64px',
            flex: '1 1 0%'
        },
        toggleLabel: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0px',
            paddingTop: '0px',
            letterSpacing: '0px',
            fontSize: '18px',
            fontWeight: '400',
            color: 'rgb(255, 255, 255)',
            height: '64px',
        },
        toggle: {
            marginTop: '24px',
            lineHeight: '64px',
            flex: '1 1 0%'

        }
    }

    return (

        <div>
            <MediaQuery minWidth={992}>
                <AppBar
                    style={{backgroundColor: "#333", position: "fixed"}}
                    onLeftIconButtonTouchTap={() => props.toggleMenu()}
                    children={
                        <Grid fluid className="full-width">
                            <Row>
                                {props.showMenu &&
                                <Col sm={2} smOffset={2}>
                                    <FlatButton style={styles.label} className="pull-left"
                                                onClick={() => props.toggleOptions(false)}>Hide Options</FlatButton>
                                    {/*<FontIcon className="muidocs-icon-action-home pull-left" onClick={() => props.toggleMenu()} />*/}

                                </Col>
                                }
                                {!props.showMenu &&
                                <Col sm={2}>
                                    <FlatButton style={styles.label} className="pull-left"
                                                onClick={() => props.toggleOptions(false)}>Hide Options</FlatButton>
                                </Col>
                                }
                                <Col sm={2}>
                                    <Toggle
                                        className="inline-block"
                                        label="Videos"
                                        toggled={props.showVideos}
                                        labelPosition="right"
                                        style={styles.toggle}
                                        labelStyle={styles.toggleLabel}
                                        onToggle={()=> props.toggleVideos()}

                                    />
                                </Col>
                                <Col sm={2}>
                                    <FlatButton style={styles.label} className="pull-left"
                                                onClick={() => props.toggleMenu()}>Change Colors</FlatButton>
                                </Col>
                                <Col sm={2}>
                                    <FlatButton style={styles.label} className="pull-left"
                                                onClick={() => props.toggleMenu()}>Display per Row</FlatButton>
                                </Col>
                                <Col sm={2}>
                                    <FlatButton style={styles.label} className="pull-left"
                                                onClick={() => props.toggleMenu()}>About</FlatButton>
                                </Col>

                            </Row>
                        </Grid>
                    }
                />
            </MediaQuery>
            <MediaQuery maxWidth={992}>
                <div>
                    <DropdownButton id="Menu" title="Options" className="pull-right" noCaret>
                        <MenuItem onClick={()=> props.toggleVideos()}>{props.showVideos ? "Show Photos" : "Show Videos"}</MenuItem>
                        <MenuItem onClick={()=> props.toggleVideos()}>Colors</MenuItem>
                        <MenuItem onClick={()=> props.toggleVideos()}>About</MenuItem>
                    </DropdownButton>
                </div>
            </MediaQuery>
        </div>
    )
}
export default ButtonSection