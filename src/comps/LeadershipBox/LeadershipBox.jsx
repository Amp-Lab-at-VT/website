import React, { Component } from "react";

import "@/pages/Leadership/leadership.module.css"

import Image from 'next/image'

class LeadershipBox extends Component {
    /*
    Expects an image prop, which is a string
    This will then generate a div with the image
    If the string is blank, the uid will be used instead

    Props needed: image, uid
    */

    render() {
        // Simple div with a title and value
        if (this.props.src !== undefined) {
            return (
                <div class = "leadershipBox">
                    <p><Image src={this.props.src} alt={this.props.name + "Image"}></Image></p>
                    <p><em>{this.props.title}</em></p>
                    <p><a href={"mailto:" + this.props.email}>{this.props.email}</a></p>
                </div>
            )
        }
    }
}

export default LeadershipBox;