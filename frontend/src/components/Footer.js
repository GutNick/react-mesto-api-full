import React from "react";

function Footer() {
    const date = new Date().getFullYear();
    return (
        <footer className="footer">
            <p className="footer__text">&#169; {date} Mesto Russia</p>
        </footer>
    )
}

export default Footer;