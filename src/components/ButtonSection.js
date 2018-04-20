import React from "react";
import MediaQuery from "react-responsive";
import Drawer from "material-ui/Drawer";
import MaterialItem from "material-ui/MenuItem";
import {DropdownButton, MenuItem} from "react-bootstrap"




const ButtonSection = (props) => {
    return (

        <div>
            <MediaQuery minWidth={992}>
                {!props.showMenu && !props.showOptions &&
                <div>
                    <button className="pull-left btn btn-default" onClick={() => props.toggleMenu()}>Show Menu</button>
                </div>}
                <Drawer open={props.showMenu}>
                    {!props.showHomepage &&
                        <div>
                            <MaterialItem onClick={() => props.toggleMenu()}><span className="menu-button">Hide Menu</span></MaterialItem>
                            {!props.showOptions && <MaterialItem  onClick={() => props.toggleOptions(true)}><span className="menu-button">Show Options</span></MaterialItem>}
                            <MaterialItem  onClick={() => props.toggleHomepage(true)}>Highlights</MaterialItem>
                        </div>
                    }
                    {props.albums.map((album, index) => {
                        return <MaterialItem key={index} onClick={() => props.viewAlbum(album)}>{album}</MaterialItem>
                    })
                    }
                </Drawer>
            </MediaQuery>
            <MediaQuery maxWidth={992}>
                <div>
                    <DropdownButton id="Menu" title="Menu" className="pull-right" noCaret>
                        {!props.showHomepage && <MenuItem onClick={() => props.toggleHomepage(true)}>Highlights</MenuItem>}
                        {props.albums.map((album, index) => {
                            return <MenuItem key={index} eventKey={index} onClick={() => props.viewAlbum(album)}>{album}</MenuItem>
                        })
                        }
                    </DropdownButton>
                </div>
            </MediaQuery>

        </div>
    )
}
export default ButtonSection