import React, { Component } from "react";

import "./project.css"

class ProjectBox extends Component {
    /*
    Expects an image prop, which is a string
    This will then generate a div with the image
    If the string is blank, the uid will be used instead

    Props needed: image, uid
    */

    render() {
        // Simple div with a title and value
        if (this.props.image === undefined) {
            return (
                <a href={this.props.href} class="projectBox">
                    <text >
                    {this.props.name}
                    </text>
                </a>
            )
        }
    }
}

export default ProjectBox;