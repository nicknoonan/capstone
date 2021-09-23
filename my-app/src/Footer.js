import React from "react";
import "./Footer.css"; 

function Footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                        <h4> Dank memes inc</h4>
                        <ul className="list-unstyled">
                            <li>342-420-6969</li>
                            <li>Phat Dub</li>
                            <li>Git Gud</li>
                        </ul>
                    </div>
                    {/* Column2 */}
                    <div className="col">
                        <h4> Dank memes inc</h4>
                        <ul className="list-unstyled">
                            <li>342-420-6969</li>
                            <li>Phat Dub</li>
                            <li>Git Gud</li>
                        </ul>
                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <h4> Dank memes inc</h4>
                        <ul className="list-unstyled">
                            <li>342-420-6969</li>
                            <li>Phat Dub</li>
                            <li>Git Gud</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} THICC BOI LLC | All rights reserved | Terms of Service | Privacy

                    </p>

                </div>
            </div>
        </div>
    );
}

export default Footer;