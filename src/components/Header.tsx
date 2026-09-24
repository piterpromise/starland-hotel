import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faSpa, faCalendarAlt, faCalendarCheck, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="nav__inner">
                <a href="#" className="nav__brand">
                    <span className="brand-title">STAR LAND HOTEL</span>
                    <span className="brand-sub">BASTOS — YAOUNDÉ</span>
                </a>

                <div className="nav__desktop-links">
                    <a href="#rooms" className="nav__link">
                        <FontAwesomeIcon icon={faBed} className="nav__icon" /> Chambres
                    </a>
                    <a href="#gastronomy" className="nav__link">
                        <FontAwesomeIcon icon={faUtensils} className="nav__icon" /> Gastronomie
                    </a>
                    <a href="#wellness" className="nav__link">
                        <FontAwesomeIcon icon={faSpa} className="nav__icon" /> Bien-être
                    </a>
                    <a href="#events" className="nav__link">
                        <FontAwesomeIcon icon={faCalendarAlt} className="nav__icon" /> Événements
                    </a>
                    <a href="#reservation" className="btn btn--primary">
                        <FontAwesomeIcon icon={faCalendarCheck} /> Réserver
                    </a>
                </div>

                <button 
                    className="nav__toggle" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="nav__mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <a href="#rooms" onClick={() => setMobileMenuOpen(false)}>Chambres</a>
                        <a href="#gastronomy" onClick={() => setMobileMenuOpen(false)}>Gastronomie</a>
                        <a href="#wellness" onClick={() => setMobileMenuOpen(false)}>Bien-être</a>
                        <a href="#events" onClick={() => setMobileMenuOpen(false)}>Événements</a>
                        <a href="#reservation" className="btn btn--primary" onClick={() => setMobileMenuOpen(false)}>Réserver</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

