import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    return (
        <motion.nav 
            className="nav"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="nav__inner">
                <a href="#" className="nav__brand">
                    <span>STAR LAND HOTEL</span>
                    <span className="nav__brand-sub">BASTOS — YAOUNDÉ</span>
                </a>
                <div className="nav__menu">
                    <a href="#rooms" className="nav__link">Chambres</a>
                    <a href="#gastronomy" className="nav__link">Gastronomie</a>
                    <a href="#wellness" className="nav__link">Bien-être</a>
                    <a href="#events" className="nav__link">Événements</a>
                    <a href="#reservation" className="btn btn--primary">Réserver</a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

