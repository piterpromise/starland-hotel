import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero__background">
                <img 
                    src="/Images_compressed/pexels-bryan-verxes-1257698-5470041.webp" 
                    alt="Star Land Hotel Bastos" 
                    className="hero__img" 
                />
                <div className="hero__overlay" />
            </div>

            <div className="container hero__content">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="eyebrow">
                        <FontAwesomeIcon icon={faStar} className="star-icon" /> Hôtel de Prestige — Bastos
                    </span>
                    <h1 className="hero__title">
                        L'Excellence et la Sérénité au Cœur de Yaoundé
                    </h1>
                    <p className="hero__subtitle">
                        84 chambres et suites d'exception, cuisine gastronomique, spa de classe internationale et piscine panoramique.
                    </p>
                    
                    <div className="hero__actions">
                        <a href="#reservation" className="btn btn--primary">
                            Réserver Votre Séjour <span className="btn__arrow" />
                        </a>
                        <a href="#rooms" className="btn btn--ghost">
                            Découvrir les Suites <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

