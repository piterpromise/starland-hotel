import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarCheck, faArrowLeft, faArrowRight, faTimes, faChevronLeft, faChevronRight,
    faUser, faEnvelope, faUsers, faCalendarAlt, faPhone, faConciergeBell, faCommentAlt,
    faPaperPlane, faStar, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GallerySlideshow from './components/GallerySlideshow';
import CustomCalendar from './components/CustomCalendar';

/* ========================================================================
   IMPORTS DES IMAGES (ENTÊTE DU COMPOSANT)
   ======================================================================== */
// Images Héro & Philosophie
import logoImg from '../Logo/logo.png';
import heroBg from '../Autres Images/FACADE2.webp';
import heroVideo1 from '../Videos/hero1.mp4';
import heroVideo2 from '../Videos/hero2.mp4';
import heroVideo3 from '../Videos/hero3.mp4';
import aboutImg1 from '../Autres Images/HALL.webp';
import aboutImg2 from '../Autres Images/TERRASSE2.webp';
import aboutImg3 from '../Images_compressed/image16.webp';

// Images Chambres (Images_compressed)
import roomStandard from '../Images_compressed/image15.webp';
import roomDeluxe from '../Images_compressed/image14.webp';
import roomJunior from '../Images_compressed/image13.webp';
import roomExecutive from '../Images_compressed/image12.webp';
import roomPresidential from '../Images_compressed/image11.webp';

// Images Restauration (Images_compressed & Autres Images)
import diningRoom from '../Autres Images/RESTAURANT.webp';
import diningBar from '../Autres Images/RESTAURANT2.webp';

// Images Galerie (Autres Images & Images_compressed)
import galleryImg1 from '../Autres Images/FACADE2.webp';
import galleryImg2 from '../Autres Images/HALL.webp';
import galleryImg3 from '../Autres Images/RESTAURANT.webp';
import galleryImg4 from '../Images_compressed/image4.webp';
import galleryImg5 from '../Autres Images/PISCINE.webp';
import galleryImg6 from '../Autres Images/SPA.webp';
import galleryImg7 from '../Autres Images/CONFERENCE2.webp';
import galleryImg8 from '../Autres Images/TERRASSE2.webp';

// Images Repas (Repas/*.webp)
import repas1 from '../Repas/repas1.webp';
import repas2 from '../Repas/repas2.webp';
import repas3 from '../Repas/repas3.webp';
import repas4 from '../Repas/repas4.webp';
import repas5 from '../Repas/repas5.webp';
import repas6 from '../Repas/repas6.webp';
import repas7 from '../Repas/repas7.webp';
import repas8 from '../Repas/repas8.webp';
import repas9 from '../Repas/repas9.webp';
import repas10 from '../Repas/repas10.webp';
import repas11 from '../Repas/repas11.webp';
import repas12 from '../Repas/repas12.webp';

gsap.registerPlugin(ScrollTrigger);

const gallerySlides = [
    { 
        image: galleryImg1, 
        number: '01', 
        label: 'Façade', 
        title: 'Façade principale', 
        subtitle: 'L’élégance Star Land dès le premier regard.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">QUARTIER RESIDENTIEL & DIPLOMATIQUE</span>
                <p>Situé au cœur de Bastos à Yaoundé, Star Land Hotel déploie une architecture contemporaine raffinée alliance de pierre noble, de bois chaleureux et de baies vitrées baignées de lumière.</p>
                <p>Notre établissement vous accueille avec un niveau de sécurité maximal et un service personnalisé de premier ordre.</p>
                <ul>
                    <li>Architecture contemporaine & finitions haut de gamme</li>
                    <li>Service voiturier & conciergerie VIP disponible 24/7</li>
                    <li>Parking privé sécurisé sous contrôle vidéo continu</li>
                    <li>Accès stratégique à 10 min des ambassades et centres d'affaires</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#about" className="btn btn--primary">Découvrir l'Hôtel</a>
                    <a href="#reserve" className="btn btn--outline">Réserver</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg2, 
        number: '02', 
        label: 'Accueil', 
        title: 'Hall de réception', 
        subtitle: 'Une arrivée lumineuse et chaleureuse.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">ACCUEIL CONTINU 24H/24 & 7J/7</span>
                <p>Notre hall donne immédiatement le ton de votre séjour : une atmosphère apaisante, des matières nobles travaillées avec soin et un personnel dévoué prêt à répondre à chacune de vos exigences.</p>
                <ul>
                    <li>Check-in & Check-out express sur mesure</li>
                    <li>Salon lounge affaires avec Wi-Fi très haut débit</li>
                    <li>Service de conciergerie dédié (réservations, navettes, excursions)</li>
                    <li>Rafraîchissements et cocktail de bienvenue offerts</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#services" className="btn btn--primary">Nos Services</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg3, 
        number: '03', 
        label: 'Gastronomie', 
        title: 'Restaurant Le Bastos', 
        subtitle: 'La haute gastronomie camerounaise et internationale.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">OUVERT TOUS LES JOURS 06H30 - 23H00</span>
                <p>Une table d'exception où nos chefs revisitent avec créativité les saveurs du terroir camerounais tout en sublimant les grands classiques de la cuisine internationale.</p>
                <ul>
                    <li>Produits frais du marché et poissons sélectionnés</li>
                    <li>Cave d'exception regroupant de grands crus internationaux</li>
                    <li>Salons privatifs réservés aux repas d'affaires et dîners intimes</li>
                    <li>Menu dégustation & formules petit-déjeuner buffet</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#dining" className="btn btn--primary">Voir la Carte</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg4, 
        number: '04', 
        label: 'Suites', 
        title: 'Suite présidentielle', 
        subtitle: 'Des volumes généreux et un confort d’exception.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">SUPERFICIE 120 M² · VUE PANORAMIQUE</span>
                <p>Pensé pour les voyageurs exigeants et les séjours prolongés, cet écrin de prestige marie literie king-size de qualité supérieure, mobilier sur-mesure et vue imprenable sur Yaoundé.</p>
                <ul>
                    <li>Grand salon de réception séparé & salle à manger VIP</li>
                    <li>Salle de bain en marbre avec jacuzzi privatif & douche italienne</li>
                    <li>Service de majordome personnel & room service 24/7</li>
                    <li>Équipements technologiques de pointe & dressing spacieux</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#rooms" className="btn btn--primary">Découvrir les Suites</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg5, 
        number: '05', 
        label: 'Détente', 
        title: 'Piscine extérieure', 
        subtitle: 'Une parenthèse de fraîcheur au cœur de Bastos.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">BASSIN CHAUFFÉ · POOL BAR LOUNGE</span>
                <p>Découvrez notre oasis aquatique nichée dans la verdure. Que ce soit pour faire quelques longueurs matinales ou vous détendre en fin de journée, la piscine Star Land vous garantit un moment suspendu.</p>
                <ul>
                    <li>Bassin chauffé maintenu à température idéale toute l'année</li>
                    <li>Solarium équipé de transats grand confort & cabanas somptueuses</li>
                    <li>Pool Bar proposant cocktails rafraîchissants et en-cas gourmands</li>
                    <li>Serviettes moelleuses et rafraîchissements fournis à disposition</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#services" className="btn btn--primary">Espace Lounge</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg6, 
        number: '06', 
        label: 'Bien-être', 
        title: 'Spa & bien-être', 
        subtitle: 'Des soins régénérants dans un écrin apaisant.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">SUR RENDEZ-VOUS 09H00 - 21H00</span>
                <p>Ressourcez votre corps et votre esprit grâce à notre carte de rituels holistiques, massages relaxants et soins esthétiques personnalisés orchestrés par nos thérapeutes experts.</p>
                <ul>
                    <li>Cabines de massage individuelles et duos pour couples</li>
                    <li>Hammam traditionnel à la vapeur d'eucalyptus & Sauna finlandais</li>
                    <li>Soins du visage et du corps élaborés avec des produits naturels</li>
                    <li>Espace de relaxation avec tisanerie bio offerte</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#reserve" className="btn btn--primary">Réserver un Soin</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg7, 
        number: '07', 
        label: 'Événements', 
        title: 'Salle de conférence', 
        subtitle: 'Un cadre d’exception pour vos événements d’entreprise.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">CAPACITÉ JUSQU'À 200 PERSONNES</span>
                <p>Nos espaces événementiels modulables sont spécialement configurés pour accueillir vos réunions d'affaires, séminaires, conférences de presse et banquets prestigieux dans les meilleures conditions.</p>
                <ul>
                    <li>Écrans interactifs 4K, vidéoprojecteurs & régie son haute fidélité</li>
                    <li>Visioconférence sécurisée & connexion très haut débit dédiée</li>
                    <li>Service traiteur personnalisé (pauses café, déjeuners d'affaires)</li>
                    <li>Équipe de coordination événementielle dédiée sur site</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#contact" className="btn btn--primary">Demander un Devis</a>
                </div>
            </div>
        )
    },
    { 
        image: galleryImg8, 
        number: '08', 
        label: 'Jardin', 
        title: 'Terrasse & jardin', 
        subtitle: 'Le calme d’un jardin tropical à dix minutes du centre-ville.', 
        details: (
            <div className="gallery-detail-content">
                <span className="gallery-detail-info-badge">ESPACE PLEIN AIR & AFTERWORK</span>
                <p>Laissez-vous charmer par la quiétude de notre jardin paysager. Un écrin de verdure idyllique pour savourer un apéritif au coucher du soleil ou partager un dîner romantique sous les étoiles.</p>
                <ul>
                    <li>Végétation tropicale préservée & éclairage d'ambiance féerique</li>
                    <li>Espace lounge plein air idéal pour vos cocktails & afterworks</li>
                    <li>Service de boissons et petite restauration en terrasse</li>
                    <li>Possibilité de privatisation pour réceptions et événements exclusifs</li>
                </ul>
                <div className="gallery-detail-btn-group">
                    <a href="#dining" className="btn btn--primary">Réserver une Table</a>
                </div>
            </div>
        )
    }
];

const App: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [repasActiveIndex, setRepasActiveIndex] = useState(4);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Preloader state (10s total)
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [preloaderFading, setPreloaderFading] = useState(false);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 2500; // 2.5s progress + 0.5s fade out = 3s max total

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setPreloaderFading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Hero Carousel (from PUG.html)
    const heroSlides = [
        {
            id: 1,
            title: 'L\'art de recevoir',
            name: 'Star Land Hotel',
            des: 'Quatre-vingt-quatre chambres & suites, un restaurant gastronomique, et le silence d\'un jardin à dix minutes du centre-ville de Yaoundé.',
            image: heroBg,
            video: heroVideo1,
            isVideo: true,
            tag: 'Yaoundé · Bastos'
        },
        {
            id: 2,
            title: 'Élégance & Accueil',
            name: 'Hall d\'Honneur',
            des: 'Un patio lumineux planté d\'irokos centenaires, un service de conciergerie dédié 24h/24 et un check-in personnalisé en toute sérénité.',
            image: aboutImg1,
            video: heroVideo2,
            isVideo: true,
            tag: 'Réception · Bastos'
        },
        {
            id: 3,
            title: 'Gastronomie Raffinée',
            name: 'Le Restaurant',
            des: 'Une table d\'exception sublimant les saveurs locales camerounaises et la haute cuisine internationale avec cave à vins sélectionnés.',
            image: diningRoom,
            video: heroVideo3,
            isVideo: true,
            tag: 'Saveurs & Vins'
        },
        {
            id: 4,
            title: 'Oasis & Sérénité',
            name: 'Piscine & Lounge',
            des: 'Bassin chauffé à ciel ouvert, transats ombragés et cocktails signatures pour des moments de détente absolue sous le soleil de Yaoundé.',
            image: galleryImg5,
            isVideo: false,
            tag: 'Détente · Plein Air'
        },
        {
            id: 5,
            title: 'Bien-Être Absolu',
            name: 'Spa & Balnéothérapie',
            des: 'Massages holistiques, rituels traditionnels et soins régénérants prodigués par nos thérapeutes experts au cœur de Bastos.',
            image: galleryImg6,
            isVideo: false,
            tag: 'Soins & Spa'
        },
        {
            id: 6,
            title: 'Prestige & Confort',
            name: 'Suites Exécutives',
            des: 'Volumes généreux, literie d\'exception, salon privé et balcon donnant sur les collines verdoyantes de la capitale.',
            image: roomPresidential,
            isVideo: false,
            tag: 'Chambres & Suites'
        }
    ];

    const heroCarouselRef = useRef<HTMLDivElement>(null);
    const heroListRef = useRef<HTMLDivElement>(null);
    const heroRunningTimeRef = useRef<HTMLDivElement>(null);
    const [selectedHeroSlide, setSelectedHeroSlide] = useState<any>(null);
    const [isHeroPopupVisible, setIsHeroPopupVisible] = useState(false);
    const [isHeroPopupFadingOut, setIsHeroPopupFadingOut] = useState(false);

    const heroTimeRunning = 1000;
    const heroTimeAutoNext = 20000;

    const showHeroSlider = (type: 'next' | 'prev') => {
        if (!heroListRef.current || !heroCarouselRef.current) return;

        const sliderItems = heroListRef.current.querySelectorAll('.hero-carousel__item');
        if (sliderItems.length === 0) return;
        const carousel = heroCarouselRef.current;

        if (type === 'next') {
            heroListRef.current.appendChild(sliderItems[0]);
            carousel.classList.add('next');
        } else {
            heroListRef.current.prepend(sliderItems[sliderItems.length - 1]);
            carousel.classList.add('prev');
        }

        const timeOutId = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
            clearTimeout(timeOutId);
        }, heroTimeRunning);

        resetHeroTimeAnimation();
    };

    const resetHeroTimeAnimation = () => {
        if (heroRunningTimeRef.current) {
            const runningTime = heroRunningTimeRef.current;
            runningTime.style.animation = 'none';
            void runningTime.offsetHeight; // trigger reflow
            runningTime.style.animation = 'runningHeroTime 20s linear 1 forwards';
        }
    };

    const openHeroPopup = (slide: any) => {
        setSelectedHeroSlide(slide);
        setIsHeroPopupVisible(true);
        setIsHeroPopupFadingOut(false);
    };

    const closeHeroPopup = () => {
        setIsHeroPopupFadingOut(true);
        setTimeout(() => {
            setIsHeroPopupVisible(false);
            setSelectedHeroSlide(null);
        }, 300);
    };

    useEffect(() => {
        const autoAdvanceInterval = setInterval(() => {
            showHeroSlider('next');
        }, heroTimeAutoNext);

        return () => clearInterval(autoAdvanceInterval);
    }, []);

    useEffect(() => {
        resetHeroTimeAnimation();
    }, []);

    // Auto-slide pour la section Repas (10s)
    useEffect(() => {
        const interval = setInterval(() => {
            const list = document.getElementById('repasList');
            if (!list) return;
            const items = list.querySelectorAll('.repas-carousel__item');
            const active = list.querySelector('[data-active]');
            let idx = Array.from(items).indexOf(active as Element);
            const first = items[0];
            first.remove();
            list.append(first);
            const newItems = list.querySelectorAll('.repas-carousel__item');
            newItems.forEach(el => el.removeAttribute('data-active'));
            if (newItems[idx]) newItems[idx].setAttribute('data-active', 'true');
            setRepasActiveIndex((prev) => (prev + 1) % 12);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Form inputs state
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [voyageurs, setVoyageurs] = useState('2 adultes');
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [demandeParticuliere, setDemandeParticuliere] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // IntersectionObserver for reveal elements
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        if (entry.target.hasAttribute('data-reveal-stagger')) {
                            const children = entry.target.children;
                            Array.from(children).forEach((child: any, i) => {
                                child.style.transitionDelay = `${i * 90}ms`;
                            });
                        }
                    } else {
                        entry.target.classList.remove('is-in');
                        if (entry.target.hasAttribute('data-reveal-stagger')) {
                            Array.from(entry.target.children).forEach((child: any) => {
                                child.style.transitionDelay = '0ms';
                            });
                        }
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
        );

        document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach((el) => {
            revealObserver.observe(el);
        });

        // Counter Observer
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const target = parseFloat(el.getAttribute('data-counter') || '0');
                        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                        const suffix = el.getAttribute('data-suffix') || '';
                        const duration = 1800;
                        const start = performance.now();

                        function tick(now: number) {
                            const t = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(1 - t, 3);
                            const val = target * eased;
                            el.textContent = val.toFixed(decimals) + suffix;
                            if (t < 1) requestAnimationFrame(tick);
                            else el.textContent = target.toFixed(decimals) + suffix;
                        }
                        requestAnimationFrame(tick);
                        counterObserver.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

        // Services Horizontal Pin-scroll & Elastic Curtain Effect (First in DOM)
        const servicesViewport = document.getElementById('servicesViewport');
        const servicesTrack = document.getElementById('servicesTrack');
        const servicesProgressBar = document.getElementById('servicesProgressBar');

        let servicesTween: any = null;

        if (servicesViewport && servicesTrack && window.innerWidth >= 1024) {
            const getServicesScrollAmount = () => servicesTrack.scrollWidth - window.innerWidth;
            const serviceCards = servicesTrack.querySelectorAll('.project, .service-card');

            // Set initial state for cards to be visible
            gsap.set(serviceCards, { opacity: 1, y: 0, scale: 1 });

            servicesTween = gsap.to(servicesTrack, {
                x: () => -getServicesScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: servicesViewport,
                    start: 'top top',
                    end: () => '+=' + getServicesScrollAmount(),
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (servicesProgressBar) {
                            servicesProgressBar.style.width = self.progress * 100 + '%';
                        }

                        const velocity = self.getVelocity() / 400;
                        const skew = Math.max(-10, Math.min(10, velocity));

                        gsap.to(serviceCards, {
                            skewX: skew,
                            rotationY: skew * 0.4,
                            duration: 0.4,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });

                        clearTimeout((window as any)._servicesSkewTimeout);
                        (window as any)._servicesSkewTimeout = setTimeout(() => {
                            gsap.to(serviceCards, {
                                skewX: 0,
                                rotationY: 0,
                                duration: 0.8,
                                ease: 'elastic.out(1, 0.4)'
                            });
                        }, 100);
                    }
                }
            });
        }

        // Rooms Horizontal Pin-scroll & Elastic Curtain Effect (Second in DOM)
        const roomsViewport = document.getElementById('roomsViewport');
        const roomsTrack = document.getElementById('roomsTrack');
        const roomsProgressBar = document.getElementById('roomsProgressBar');

        let roomsTween: any = null;

        if (roomsViewport && roomsTrack && window.innerWidth >= 1024) {
            const getScrollAmount = () => roomsTrack.scrollWidth - window.innerWidth;
            const cards = roomsTrack.querySelectorAll('.room-card');

            // Set initial state for cards to be visible
            gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

            roomsTween = gsap.to(roomsTrack, {
                x: () => -getScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: roomsViewport,
                    start: 'top top',
                    end: () => '+=' + getScrollAmount(),
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (roomsProgressBar) {
                            roomsProgressBar.style.width = self.progress * 100 + '%';
                        }

                        // Curtain Elastic Skew effect based on scroll velocity
                        const velocity = self.getVelocity() / 400;
                        const skew = Math.max(-12, Math.min(12, velocity));

                        gsap.to(cards, {
                            skewX: skew,
                            rotationY: skew * 0.5,
                            duration: 0.4,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });

                        clearTimeout((window as any)._skewTimeout);
                        (window as any)._skewTimeout = setTimeout(() => {
                            gsap.to(cards, {
                                skewX: 0,
                                rotationY: 0,
                                duration: 0.8,
                                ease: 'elastic.out(1, 0.4)'
                            });
                        }, 100);
                    }
                }
            });
        }

        // Refresh ScrollTrigger to ensure pin positions and spacers match DOM layout
        ScrollTrigger.refresh();

        const handleImageLoad = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('load', handleImageLoad);
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            revealObserver.disconnect();
            counterObserver.disconnect();
            window.removeEventListener('load', handleImageLoad);
            clearTimeout(refreshTimer);
            if (servicesTween) servicesTween.kill();
            if (roomsTween) roomsTween.kill();
        };
    }, []);



    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    return (
        <div className="app">
            {/* PRELOADER SCREEN */}
            {isLoading && (
                <div className={`starland-preloader ${preloaderFading ? 'is-fading' : ''}`}>
                    {/* 7x4 = 28 Grid overlay */}
                    <div className="preloader-grid">
                        {Array.from({ length: 48 }).map((_, index) => (
                            <div 
                                key={index} 
                                className="grid-cell"
                                style={{ 
                                    animationDelay: `${(index % 8) * 0.12 + Math.floor(index / 8) * 0.15}s` 
                                }}
                            ></div>
                        ))}
                    </div>

                    <div className="preloader-content">
                        {/* Title Animation */}
                        <div className="preloader-brand">
                            <h1 className="brand-starland">STARLAND</h1>
                            <h2 className="brand-hotel">HOTEL</h2>
                        </div>

                        {/* Metronome Loader from PUG.html */}
                        <div className="preloader-loader">
                            <div className="container">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <div key={i} className={`baton-${i}`}>
                                        <div className="metronome">
                                            <div className="baton"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar & Percentage */}
                        <div className="preloader-progress-wrapper">
                            <div className="preloader-progress-track">
                                <div 
                                    className="preloader-progress-bar" 
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <div className="preloader-percentage">
                                <span>CHARGEMENT</span>
                                <span>{loadingProgress}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* NAV */}
            <nav className={`nav ${isScrolled ? 'is-scrolled' : ''}`} id="nav">
                <div className="nav__inner">
                    <a href="#top" className="nav__brand">
                        <img src={logoImg} alt="Star Land Hotel" className="nav__logo-img" />
                    </a>
                    <ul className={`nav__links ${navOpen ? 'is-open' : ''}`} id="navLinks">
                        <li><a href="#about" onClick={() => setNavOpen(false)}>L'hôtel</a></li>
                        <li><a href="#rooms" onClick={() => setNavOpen(false)}>Chambres</a></li>
                        <li><a href="#dining" onClick={() => setNavOpen(false)}>Restauration</a></li>
                        <li><a href="#services" onClick={() => setNavOpen(false)}>Services</a></li>
                        <li><a href="#gallery" onClick={() => setNavOpen(false)}>Galerie</a></li>
                        <li><a href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
                    </ul>
                    <a href="#reserve" className="nav__cta">
                        <FontAwesomeIcon icon={faCalendarCheck} /> Réserver
                    </a>
                    <div 
                        className={`nav__burger ${navOpen ? 'is-open' : ''}`} 
                        id="navBurger"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* HERO CAROUSEL (From PUG.html) */}
            <header className="hero-carousel-section" id="top">
                <div className="carousell" ref={heroCarouselRef}>
                    <div className="list" ref={heroListRef}>
                        {heroSlides.map((slide) => (
                            <div 
                                key={slide.id} 
                                className="item hero-carousel__item" 
                                style={{ 
                                    backgroundImage: slide.isVideo ? 'none' : `url(${slide.image})` 
                                }}
                            >
                                {slide.isVideo && (
                                    <video
                                        className="hero-carousel__video"
                                        src={slide.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                    />
                                )}
                                <div className="hero-carousel__gradient"></div>
                                <div className="content">
                                    <div className="title">{slide.title}</div>
                                    <div className="name">{slide.name}</div>
                                    <div className="des">{slide.des}</div>
                                    <div className="btn">
                                        <button onClick={() => openHeroPopup(slide)}>En savoir plus</button>
                                        <a href="#reserve" className="hero-carousel__book-btn">Réserver un séjour</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="arrows">
                        <button 
                            className="prev" 
                            aria-label="Image précédente"
                            onClick={() => showHeroSlider('prev')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button 
                            className="next" 
                            aria-label="Image suivante"
                            onClick={() => showHeroSlider('next')}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>

                    <div className="timeRunning" ref={heroRunningTimeRef}></div>

                    <div className="hero-carousel__scroll">
                        <span className="hero-carousel__scroll-text">Défiler</span>
                        <span className="hero-carousel__scroll-line"></span>
                    </div>
                </div>

                {/* Popup Details (From PUG.html) */}
                {isHeroPopupVisible && selectedHeroSlide && (
                    <div className={`popup__overlay events ${isHeroPopupFadingOut ? 'hide' : 'show'}`} onClick={closeHeroPopup}>
                        <div className="popup__content events" onClick={(e) => e.stopPropagation()}>
                            <div className="popup__header">
                                <h2 className="popup__title events">{selectedHeroSlide.title}</h2>
                                <button className="popup__close events" onClick={closeHeroPopup}>
                                    <FontAwesomeIcon icon={faTimes} className="fa-times" />
                                    <span className="close-text">Fermer</span>
                                </button>
                            </div>
                            {selectedHeroSlide.isVideo ? (
                                <video
                                    src={selectedHeroSlide.video}
                                    className="popup__img events"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img 
                                    src={selectedHeroSlide.image} 
                                    alt={selectedHeroSlide.name} 
                                    className="popup__img events" 
                                />
                            )}
                            <div className="title__date">
                                <h3 className="popup__name events">{selectedHeroSlide.name}</h3>
                                <span className="popup__date">
                                    {selectedHeroSlide.tag}
                                </span>
                            </div>
                            <p className="popup__description events">{selectedHeroSlide.des}</p>
                            <div style={{ marginTop: '20px', marginLeft: '50px' }}>
                                <a href="#reserve" className="btn btn--primary" onClick={closeHeroPopup}>
                                    Réserver l'expérience <span className="btn__arrow"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* ABOUT */}
            <section className="about" id="about">
                <div className="container container--wide">
                    <div className="about__inner">
                        <div className="about__left" data-reveal>
                            <span className="eyebrow">Philosophie</span>
                            <h2 className="about__title">Une maison où le temps <span className="italic">ralentit</span>.</h2>
                            <p className="about__lede">
                                Star Land Hotel Bastos a ouvert en 2009 dans le quartier diplomatique de Yaoundé. Une maison familiale, tenue par la même équipe depuis l'origine, qui a choisi de grandir lentement plutôt que de s'agrandir vite.
                            </p>
                            <p className="about__lede">
                                Quatre-vingt-quatre chambres, deux restaurants, un spa, une piscine, et trois salles de réunion. Rien de plus que ce qui se fait bien. L'accueil est camerounais — direct, chaleureux, sans cérémonie. Le reste, la literie, les draps, les produits de toilette, le silence, est pensé pour qu'on dorme, qu'on travaille, qu'on revienne.
                            </p>
                            <div className="about__signature">
                                <div>
                                    <div className="about__signature-name">Joachim Mbarga</div>
                                    <div className="about__signature-role">Directeur général</div>
                                </div>
                            </div>
                        </div>
                        <div className="about__right">
                            <div className="about__block" data-reveal>
                                <div className="about__block-img">
                                    <img src={aboutImg1} alt="Hall de réception de Star Land Hotel" />
                                </div>
                                <span className="about__block-caption">Hall de réception · Bastos</span>
                                <p className="about__block-text">
                                    Le hall ouvre sur un patio planté d'irokos. À l'arrivée, on vous propose un jus de bissap frais et un linge frais. Le check-in prend trois minutes.
                                </p>
                            </div>
                            <div className="about__block" data-reveal>
                                <div className="about__block-img">
                                    <img src={aboutImg2} alt="Jardin intérieur de l'hôtel" />
                                </div>
                                <span className="about__block-caption">Jardin intérieur · 1 200 m²</span>
                                <p className="about__block-text">
                                    Le jardin est ouvert jusqu'à 23h. On y sert le thé l'après-midi, et les cigares le soir. Les chambres donnent dessus ou sur la ville.
                                </p>
                            </div>
                            <div className="about__block" data-reveal>
                                <div className="about__block-img">
                                    <img src={aboutImg3} alt="Détail d'une suite en marbre" />
                                </div>
                                <span className="about__block-caption">Suite Présidentielle · détail</span>
                                <p className="about__block-text">
                                    Les marbres viennent de Bembèlè. Les bois sont locaux. Les draps sont en percale de coton égyptien, 600 grammes. Rien n'est importé qui puisse être trouvé ici.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="stats" data-reveal-stagger>
                <div className="stats__inner">
                    <div className="stats__item">
                        <div className="stats__num" data-counter="4.3" data-decimals="1">0</div>
                        <div className="stats__label">Note moyenne Google</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__num" data-counter="688" data-suffix=" avis">0</div>
                        <div className="stats__label">Avis voyageurs vérifiés</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__num" data-counter="84">0</div>
                        <div className="stats__label">Chambres & suites</div>
                    </div>
                    <div className="stats__item">
                        <div className="stats__num" data-counter="15" data-suffix=" ans">0</div>
                        <div className="stats__label">Au service de Yaoundé</div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="services" id="services">
                <div className="services__intro">
                    <div className="services__intro-inner">
                        <div data-reveal>
                            <span className="eyebrow">Services de l'hôtel</span>
                            <h2 className="services__title">Tout ce qu'il faut,<br/>rien de <span className="italic">superflu.</span></h2>
                        </div>
                        <div className="services__intro-text" data-reveal>
                            Douze prestations exclusives pensées pour le voyage d'affaires comme pour le séjour privé. Chaque service est assuré par une équipe dédiée avec une disponibilité permanente.
                        </div>
                    </div>
                </div>

                <div className="services__viewport" id="servicesViewport">
                    <div className="services__track" id="servicesTrack">
                        {/* Service 01 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={aboutImg1} alt="Réception & Conciergerie 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg2} alt="Réception & Conciergerie 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg3} alt="Réception & Conciergerie 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">01 · Réception 24/7</h3>
                                <p className="service-card__desc">Une présence humaine à toute heure : late check-in, conciergerie privée, réservation de déplacements et accueil personnalisé au cœur de Bastos.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">24h/24</li>
                                    <li className="service-card__tag-pill">Conciergerie</li>
                                    <li className="service-card__tag-pill">Check-in Express</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 02 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={diningBar} alt="Restaurant Gastronomique 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={diningRoom} alt="Restaurant Gastronomique 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg3} alt="Restaurant Gastronomique 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">02 · Restaurant Gastronomique</h3>
                                <p className="service-card__desc">Cuisine franco-camerounaise d'exception signée par le chef Emmanuel Onana. Produits locaux frais et cave à vins de 120 références.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Chef Emmanuel</li>
                                    <li className="service-card__tag-pill">Plats Locaux</li>
                                    <li className="service-card__tag-pill">12h-14h30 · 19h-22h30</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 03 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={diningRoom} alt="Bar Lounge 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={diningBar} alt="Bar Lounge 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg2} alt="Bar Lounge 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">03 · Bar Lounge & Cocktails</h3>
                                <p className="service-card__desc">Cocktail signature au baobab, sélection de grands crus et rhums rares. Soirées piano jazz chaque jeudi et samedi soir.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Cocktail Baobab</li>
                                    <li className="service-card__tag-pill">Live Jazz</li>
                                    <li className="service-card__tag-pill">17h - 01h</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 04 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={aboutImg2} alt="Piscine 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg5} alt="Piscine 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={heroBg} alt="Piscine 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">04 · Piscine Extérieure & Bar</h3>
                                <p className="service-card__desc">Bassin de 18 mètres chauffé toute l'année, bordé de transats tout confort avec service continu de rafraîchissements et serviettes.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Eau à 28°</li>
                                    <li className="service-card__tag-pill">Bar Piscine</li>
                                    <li className="service-card__tag-pill">06h - 21h</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 05 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={galleryImg5} alt="Spa 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg6} alt="Spa 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg1} alt="Spa 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">05 · Spa & Well-being</h3>
                                <p className="service-card__desc">Trois cabines de soin privatives, hammam vapeur, massages bien-être aux huiles naturelles de karité et rituels relaxants complets.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Massages Karité</li>
                                    <li className="service-card__tag-pill">Hammam Vapeur</li>
                                    <li className="service-card__tag-pill">10h - 20h</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 06 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={galleryImg6} alt="Fitness 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg3} alt="Fitness 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={roomExecutive} alt="Fitness 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">06 · Salle de Fitness Technogym</h3>
                                <p className="service-card__desc">Espace d'entraînement moderne tout équipé : cardio-training haute précision, poids libres, bancs réglables et tapis de stretching.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Technogym</li>
                                    <li className="service-card__tag-pill">Cardio & Force</li>
                                    <li className="service-card__tag-pill">06h - 22h</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 07 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={aboutImg1} alt="Conférence 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg7} alt="Conférence 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg2} alt="Conférence 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">07 · Salles de Conférence 4K</h3>
                                <p className="service-card__desc">Salons d'affaires modulables pour comités de 8 à 120 personnes, sonorisation de pointe, écrans interactifs 4K et fibre dédiée.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Écrans 4K</li>
                                    <li className="service-card__tag-pill">8 à 120 pers.</li>
                                    <li className="service-card__tag-pill">Fibre 500Mbps</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 08 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={roomJunior} alt="Blanchisserie 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={roomExecutive} alt="Blanchisserie 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={roomStandard} alt="Blanchisserie 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">08 · Blanchisserie & Pressing</h3>
                                <p className="service-card__desc">Entretien délicat de vos vêtements, pressing haute précision et nettoyage à sec écologique avec restitution express en 4h.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Pressing 24h</li>
                                    <li className="service-card__tag-pill">Express 4h</li>
                                    <li className="service-card__tag-pill">07h - 19h</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 09 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={aboutImg1} alt="Navette VIP 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={heroBg} alt="Navette VIP 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg2} alt="Navette VIP 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">09 · Navette Aéroport VIP</h3>
                                <p className="service-card__desc">Navette privée tout confort climatisée vers l'Aéroport International de Yaoundé-Nsimalen avec chauffeur dédié et rafraîchissements.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Aéroport Nsimalen</li>
                                    <li className="service-card__tag-pill">Chauffeur Privé</li>
                                    <li className="service-card__tag-pill">Sur Réservation</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 10 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={roomDeluxe} alt="WiFi Fibre 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg7} alt="WiFi Fibre 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={roomPresidential} alt="WiFi Fibre 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">10 · WiFi Fibre Haut Débit</h3>
                                <p className="service-card__desc">Couverture fibre optique haut débit dédiée à 500 Mbps, disponible gratuitement et en illimité dans chaque chambre et salon.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">500 Mbps</li>
                                    <li className="service-card__tag-pill">Fibre Optique</li>
                                    <li className="service-card__tag-pill">Gratuit 24/7</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 11 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={galleryImg1} alt="Parking 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={heroBg} alt="Parking 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={aboutImg1} alt="Parking 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">11 · Parking Sécurisé & Bornes</h3>
                                <p className="service-card__desc">Stationnement privé surveillé 24h/24 par vidéo et gardiennage, incluant des bornes de recharge pour véhicules hybrides et électriques.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">80 Places</li>
                                    <li className="service-card__tag-pill">Gardiennage 24/7</li>
                                    <li className="service-card__tag-pill">Bornes Recharge</li>
                                </ul>
                            </div>
                        </article>

                        {/* Service 12 */}
                        <article className="service-card">
                            <div className="service-card__preview">
                                <picture tabIndex={0}>
                                    <img src={diningBar} alt="Petit-Déjeuner 1" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={diningRoom} alt="Petit-Déjeuner 2" />
                                </picture>
                                <picture tabIndex={0}>
                                    <img src={galleryImg3} alt="Petit-Déjeuner 3" />
                                </picture>
                            </div>
                            <div className="service-card__content">
                                <h3 className="service-card__name">12 · Petit-Déjeuner Buffet Royal</h3>
                                <p className="service-card__desc">Assortiment généreux de viennoiseries pur beurre, jus de fruits frais pressés, œufs préparés minute et grands cafés d'Éthiopie.</p>
                                <ul className="service-card__tags">
                                    <li className="service-card__tag-pill">Viennoiseries</li>
                                    <li className="service-card__tag-pill">Café Éthiopien</li>
                                    <li className="service-card__tag-pill">06h - 10h30</li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <div className="services__progress">
                        <div className="rooms__progress-bar" id="servicesProgressBar"></div>
                    </div>
                    <div className="services__hint">Défiler →</div>
                </div>
            </section>

            {/* ROOMS */}
            <section className="rooms" id="rooms">
                <div className="rooms__intro">
                    <div className="rooms__intro-inner">
                        <div data-reveal>
                            <span className="eyebrow">Chambres & suites</span>
                            <h2 className="rooms__title">Cinq catégories,<br/>une seule <span className="italic">exigence.</span></h2>
                        </div>
                        <div className="rooms__intro-text" data-reveal>
                            De la Chambre Standard à la Suite Présidentielle, tout est pensé pour le sommeil, le silence, et la lumière. Les draps sont en percale 600 grammes, les matelas à memoire de forme, les rideaux occultants. Chaque chambre a son bureau, sa connexion fibre, et son service d'étage jusqu'à 23h.
                        </div>
                    </div>
                </div>
                <div className="rooms__viewport" id="roomsViewport">
                    <div className="rooms__track" id="roomsTrack">
                        <article className="room-card">
                            <div className="room-card__media">
                                <img src={roomStandard} alt="Chambre Standard" />
                                <span className="room-card__tag">Standard</span>
                            </div>
                            <div className="room-card__body">
                                <h3 className="room-card__name">Chambre Standard</h3>
                                <div className="room-card__meta"><span>28 m²</span><span>1 lit queen</span><span>Vue jardin</span></div>
                                <p className="room-card__desc">Pour le voyageur seul ou en couple. Le minimum nécessaire, fait avec soin : bureau, salle de bain en marbre, WiFi fibre, TV satellite.</p>
                                <div className="room-card__footer">
                                    <div className="room-card__price">
                                        <span className="room-card__price-num">65 000</span>
                                        <span className="room-card__price-unit">FCFA / nuit</span>
                                    </div>
                                    <a href="#reserve" className="room-card__link">Réserver →</a>
                                </div>
                            </div>
                        </article>

                        <article className="room-card">
                            <div className="room-card__media">
                                <img src={roomDeluxe} alt="Chambre Deluxe" />
                                <span className="room-card__tag">Deluxe</span>
                            </div>
                            <div className="room-card__body">
                                <h3 className="room-card__name">Chambre Deluxe</h3>
                                <div className="room-card__meta"><span>35 m²</span><span>1 lit king</span><span>Vue ville</span></div>
                                <p className="room-card__desc">Plus d'espace, plus de lumière, un coin salon pour s'asseoir et défaire la journée. Mini-bar, machine à café, peignoirs.</p>
                                <div className="room-card__footer">
                                    <div className="room-card__price">
                                        <span className="room-card__price-num">95 000</span>
                                        <span className="room-card__price-unit">FCFA / nuit</span>
                                    </div>
                                    <a href="#reserve" className="room-card__link">Réserver →</a>
                                </div>
                            </div>
                        </article>

                        <article className="room-card">
                            <div className="room-card__media">
                                <img src={roomJunior} alt="Suite Junior" />
                                <span className="room-card__tag">Suite Junior</span>
                            </div>
                            <div className="room-card__body">
                                <h3 className="room-card__name">Suite Junior</h3>
                                <div className="room-card__meta"><span>48 m²</span><span>1 lit king</span><span>Salon séparé</span></div>
                                <p className="room-card__desc">Une chambre et un salon, pour s'installer plusieurs nuits sans se sentir camper. Walk-in closet, baignoire, bureau.</p>
                                <div className="room-card__footer">
                                    <div className="room-card__price">
                                        <span className="room-card__price-num">145 000</span>
                                        <span className="room-card__price-unit">FCFA / nuit</span>
                                    </div>
                                    <a href="#reserve" className="room-card__link">Réserver →</a>
                                </div>
                            </div>
                        </article>

                        <article className="room-card">
                            <div className="room-card__media">
                                <img src={roomExecutive} alt="Suite Exécutive" />
                                <span className="room-card__tag">Exécutive</span>
                            </div>
                            <div className="room-card__body">
                                <h3 className="room-card__name">Suite Exécutive</h3>
                                <div className="room-card__meta"><span>65 m²</span><span>2 pièces</span><span>Lounge privé</span></div>
                                <p className="room-card__desc">Chambre, salon et salle à manger privée. Accès au lounge exécutif, petit-déjeuner servi à l'étage. Pour qui voyage en famille ou reçoit.</p>
                                <div className="room-card__footer">
                                    <div className="room-card__price">
                                        <span className="room-card__price-num">220 000</span>
                                        <span className="room-card__price-unit">FCFA / nuit</span>
                                    </div>
                                    <a href="#reserve" className="room-card__link">Réserver →</a>
                                </div>
                            </div>
                        </article>

                        <article className="room-card">
                            <div className="room-card__media">
                                <img src={roomPresidential} alt="Suite Présidentielle" />
                                <span className="room-card__tag">Présidentielle</span>
                            </div>
                            <div className="room-card__body">
                                <h3 className="room-card__name">Suite Présidentielle</h3>
                                <div className="room-card__meta"><span>120 m²</span><span>2 chambres</span><span>Terrasse privée</span></div>
                                <p className="room-card__desc">Au dernier étage, vue panoramique sur Yaoundé. Deux chambres, salon, salle à manger, terrasse, majordome dédié 24h/24.</p>
                                <div className="room-card__footer">
                                    <div className="room-card__price">
                                        <span className="room-card__price-num">450 000</span>
                                        <span className="room-card__price-unit">FCFA / nuit</span>
                                    </div>
                                    <a href="#reserve" className="room-card__link">Réserver →</a>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="rooms__progress"><div className="rooms__progress-bar" id="roomsProgressBar"></div></div>
                    <div className="rooms__hint">Défiler →</div>
                </div>
            </section>

            {/* DINING */}
            <section className="dining" id="dining">
                <div className="container container--wide">
                    <div className="dining__inner">
                        <div className="dining__left" data-reveal>
                            <span className="eyebrow">Restauration</span>
                            <h2 className="dining__title">Le restaurant <span className="italic">Le Bastos</span>.</h2>
                            <p className="dining__lede">
                                Carte courte, produits du marché, cuisson précise. Le chef Emmanuel Onana travaille la cuisine camerounaise avec une technique française — Ndolè en feuille de brick, poulet DG confit, poisson braisé au piment doux. La carte change toutes les six semaines, le menu dégustation tous les quinze jours.
                            </p>
                            <p className="dining__lede">
                                Cent vingt références de vin, moitié françaises, moitié africaines (Côte d'Ivoire, Afrique du Sud, Maroc). Service par sommelier.
                            </p>
                            <div className="dining__hours">
                                <div className="dining__hours-row"><span>Petit-déjeuner</span><span>06h00 — 10h30</span></div>
                                <div className="dining__hours-row"><span>Déjeuner</span><span>12h00 — 14h30</span></div>
                                <div className="dining__hours-row"><span>Dîner</span><span>19h00 — 22h30</span></div>
                                <div className="dining__hours-row"><span>Room service</span><span>06h00 — 23h00</span></div>
                            </div>
                        </div>
                        <div className="dining__right">
                            <div data-reveal>
                                <div className="dining__img dining__img--wide">
                                    <img src={diningRoom} alt="Salle du restaurant Le Bastos" />
                                </div>
                                <p className="dining__caption">Salle principale · 48 couverts</p>
                            </div>

                            <div data-reveal>
                                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', marginBottom: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>Extrait de la carte</h3>
                                <div className="dining__menu">
                                    <div className="dining__menu-row">
                                        <div>
                                            <div className="dining__menu-name">Ndolè aux crevettes de Limbé</div>
                                            <div className="dining__menu-desc">Feuilles de ndolè, arachides torréfiées, crevettes fraîches, riz au gras</div>
                                        </div>
                                        <div className="dining__menu-price">12 500 F</div>
                                    </div>
                                    <div className="dining__menu-row">
                                        <div>
                                            <div className="dining__menu-name">Poulet DG confit, plantain glacé</div>
                                            <div className="dining__menu-desc">Cuisse confite 6h, plantain mûr, sauce tomate maison</div>
                                        </div>
                                        <div className="dining__menu-price">9 800 F</div>
                                    </div>
                                    <div className="dining__menu-row">
                                        <div>
                                            <div className="dining__menu-name">Bar braisé, sauce au piment doux</div>
                                            <div className="dining__menu-desc">Bar de Kribi, braise de charbon, attiéké, oignon rouge</div>
                                        </div>
                                        <div className="dining__menu-price">15 000 F</div>
                                    </div>
                                    <div className="dining__menu-row">
                                        <div>
                                            <div className="dining__menu-name">Menu dégustation 5 services</div>
                                            <div className="dining__menu-desc">Composition du chef, accord mets-vins en supplément</div>
                                        </div>
                                        <div className="dining__menu-price">38 000 F</div>
                                    </div>
                                </div>
                            </div>

                            <div data-reveal>
                                <div className="dining__img dining__img--tall" style={{ marginTop: '2rem' }}>
                                    <img src={diningBar} alt="Bar lounge Le Bastos" />
                                </div>
                                <p className="dining__caption">Bar lounge · 24 places</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REPAS CAROUSEL SECTION (PUG.html) */}
            <section className="repas-section" id="repas">
                <div className="container container--wide">
                    <div className="section-header cuisine" data-reveal>
                        <span className="eyebrow">Carte & Créations</span>
                        <h2 className="section-header__title">Nos Spécialités <span className="italic">& Plats d'Exception.</span></h2>
                        <p className="section-header__sub">
                            Une sélection de créations culinaires préparées chaque jour avec des produits locaux frais et une passion gastronomique.
                        </p>
                    </div>
                </div>

                <div className="container">

                    <div className="repas-carousel" data-reveal>
                        <button 
                            className="repas-arrow-btn repas-arrow-btn--prev"
                            aria-label="Plat précédent"
                            onClick={() => {
                                const list = document.getElementById('repasList');
                                if (!list) return;
                                const items = list.querySelectorAll('.repas-carousel__item');
                                const active = list.querySelector('[data-active]');
                                let idx = Array.from(items).indexOf(active as Element);
                                const last = items[items.length - 1];
                                last.remove();
                                list.prepend(last);
                                const newItems = list.querySelectorAll('.repas-carousel__item');
                                newItems.forEach(el => el.removeAttribute('data-active'));
                                if (newItems[idx]) newItems[idx].setAttribute('data-active', 'true');
                                setRepasActiveIndex((prev) => (prev - 1 + 12) % 12);
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <button 
                            className="repas-arrow-btn repas-arrow-btn--next"
                            aria-label="Plat suivant"
                            onClick={() => {
                                const list = document.getElementById('repasList');
                                if (!list) return;
                                const items = list.querySelectorAll('.repas-carousel__item');
                                const active = list.querySelector('[data-active]');
                                let idx = Array.from(items).indexOf(active as Element);
                                const first = items[0];
                                first.remove();
                                list.append(first);
                                const newItems = list.querySelectorAll('.repas-carousel__item');
                                newItems.forEach(el => el.removeAttribute('data-active'));
                                if (newItems[idx]) newItems[idx].setAttribute('data-active', 'true');
                                setRepasActiveIndex((prev) => (prev + 1) % 12);
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>

                        <ul className="repas-carousel__list" id="repasList">
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas1} alt="Ndolè Royal aux Crevettes" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Ndolè Royal aux Crevettes</h2>
                                        <h3 className="repas__title">Spécialité Camerounaise · Chef Emmanuel</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas2} alt="Poulet DG Confit" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Poulet DG Confit</h2>
                                        <h3 className="repas__title">Plantains Glacés · Tradition & Modernité</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas3} alt="Bar Braisé de Kribi" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Bar Braisé de Kribi</h2>
                                        <h3 className="repas__title">Sauce Piment Doux · Attiéké Maison</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas4} alt="Filet de Bœuf du Nord" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Filet de Bœuf du Nord</h2>
                                        <h3 className="repas__title">Jus aux Épices Locales · Purée de Patates</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0} data-active="true">
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas5} alt="Brochettes de Capitaine" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Brochettes de Capitaine</h2>
                                        <h3 className="repas__title">Grillade au Feu de Bois · Citron Vert</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas6} alt="Tartare de Mangue & Poisson" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Tartare de Mangue & Poisson</h2>
                                        <h3 className="repas__title">Entrée Fraîcheur · Saveurs Exotiques</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas7} alt="Gambas Poêlées au Karité" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Gambas Poêlées au Karité</h2>
                                        <h3 className="repas__title">Fruits de Mer · Recette Signature</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas8} alt="Sanga Traditionnel" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Sanga Traditionnel</h2>
                                        <h3 className="repas__title">Maïs & Feuilles de Zoé · Héritage</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas9} alt="Carpaccio de Langouste" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Carpaccio de Langouste</h2>
                                        <h3 className="repas__title">Huile de Baobab · Fines Herbes</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas10} alt="Magret de Canard au Miel" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Magret de Canard au Miel</h2>
                                        <h3 className="repas__title">Miel d'Oku · Poivre de Penja</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas11} alt="Assortiment de Desserts Exotiques" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Desserts Exotiques</h2>
                                        <h3 className="repas__title">Chocolat du Cameroun & Ananas</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="repas-carousel__item" tabIndex={0}>
                                <div className="repas-carousel__box">
                                    <div className="repas-carousel__image">
                                        <img src={repas12} alt="Cocktail Baobab Signature" width="480" height="720" />
                                    </div>
                                    <div className="repas-carousel__contents">
                                        <h2 className="repas__name">Cocktail Baobab</h2>
                                        <h3 className="repas__title">Création Bar Lounge · Star Land</h3>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div className="repas-progress-indicators">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`repas-indicator ${index === repasActiveIndex ? 'is-active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="gallery-section-wrapper" id="gallery">
                <div className="container container--wide">
                    <div className="gallery__top">
                        <div data-reveal>
                            <span className="eyebrow">Galerie</span>
                            <h2 className="gallery__title">L'hôtel en <span className="italic">huit images.</span></h2>
                            <p className="gallery__lede">Cliquez sur une image pour découvrir l’expérience Star Land.</p>
                        </div>
                    </div>
                </div>
                <GallerySlideshow slides={gallerySlides} />
            </section>

            {/* REVIEWS */}
            <section className="reviews" id="reviews">
                <div className="container container--wide">
                    <div className="reviews__top">
                        <div data-reveal>
                            <span className="eyebrow">Avis voyageurs</span>
                            <h2 className="reviews__title">Ce que disent <span className="italic">ceux qui reviennent.</span></h2>
                        </div>
                        <div className="reviews__score" data-reveal>
                            <div className="reviews__score-num">4.3</div>
                            <div className="reviews__score-meta">
                                <span className="reviews__score-label">Note moyenne</span>
                                <span className="reviews__score-source">688 avis Google · 312 avis Tripadvisor</span>
                            </div>
                        </div>
                    </div>
                    <div className="reviews__list" data-reveal-stagger>
                        <div className="review">
                            <p className="review__quote">Une maison où l'on se sent attendu. La chambre était prête avant l'heure, le restaurant excellent, et le personnel d'une discrétion parfaite. Quatre nuits, je reviendrai.</p>
                            <div className="review__author">
                                <span className="review__name">A. Mbarga</span>
                                <span className="review__date">Voyage d'affaires · 03/2024</span>
                            </div>
                        </div>
                        <div className="review">
                            <p className="review__quote">Le meilleur hôtel de Bastos, sans conteste. La suite exécutive donne sur la ville, le petit-déjeuner est généreux, et la piscine reste ouverte tard. Service irréprochable.</p>
                            <div className="review__author">
                                <span className="review__name">C. Eyenga</span>
                                <span className="review__date">Séjour famille · 01/2024</span>
                            </div>
                        </div>
                        <div className="review">
                            <p className="review__quote">Pour un séminaire de quarante personnes : salles impeccables, déjeuners à l'heure, et une équipe qui a anticipé chaque besoin. On reviendra l'an prochain.</p>
                            <div className="review__author">
                                <span className="review__name">F. Ngono</span>
                                <span className="review__date">Séminaire entreprise · 11/2023</span>
                            </div>
                        </div>
                        <div className="review">
                            <p className="review__quote">L'accueil dès l'aéroport, le sourire à la réception, le café à 6h du matin. Tout est juste. Et le silence, le soir, dans les jardins. Une parenthèse.</p>
                            <div className="review__author">
                                <span className="review__name">M. Talla</span>
                                <span className="review__date">Séjour privé · 02/2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCATION */}
            <section className="location" id="location">
                <div className="container container--wide">
                    <div className="location__inner">
                        <div className="location__info" data-reveal>
                            <span className="eyebrow">Localisation</span>
                            <h2 className="location__title">Au cœur de <span className="italic">Bastos.</span></h2>
                            <p className="location__lede">
                                Le quartier diplomatique de Yaoundé. Ambassades, institutions, sociétés pétrolières, à dix minutes du Palais des Congrès et du centre des affaires. Aéroport de Nsimalen à 35 minutes par la route.
                            </p>
                            <div className="location__details">
                                <div className="location__detail">
                                    <span className="location__detail-label">Adresse</span>
                                    <span className="location__detail-value">Bastos, Yaoundé III, Cameroun</span>
                                </div>
                                <div className="location__detail">
                                    <span className="location__detail-label">Téléphone</span>
                                    <span className="location__detail-value">6 71 00 08 88</span>
                                </div>
                                <div className="location__detail">
                                    <span className="location__detail-label">Site web</span>
                                    <span className="location__detail-value">www.starlandhotel.com</span>
                                </div>
                                <div className="location__detail">
                                    <span className="location__detail-label">Aéroport</span>
                                    <span className="location__detail-value">Nsimalen · 35 min</span>
                                </div>
                                <div className="location__detail">
                                    <span className="location__detail-label">Centre-ville</span>
                                    <span className="location__detail-value">Place de l'Indépendance · 12 min</span>
                                </div>
                            </div>
                        </div>
                        <div className="location__map" data-reveal>
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=11.4871%2C3.8716%2C11.5471%2C3.9116&amp;layer=mapnik&amp;marker=3.8916%2C11.5171"
                                loading="lazy"
                                title="Localisation Star Land Hotel Bastos"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESERVATION */}
            <section className="reserve" id="reserve">
                {/* SVG Gooey filter for custom PUG dropdown */}
                <svg style={{ display: 'none' }}>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </svg>

                <div className="container">
                    <div className="reserve-grid" data-reveal>
                        {/* LEFT COLUMN: Presentation, Title, Stars list, Contact cards & Socials */}
                        <div className="reserve-left-info">
                            <div>
                                <span className="eyebrow">Réservation & Contact Direct</span>
                                <h2 className="reserve-left-title">
                                    Votre Séjour <br />
                                    <span className="italic">d'Exception.</span>
                                </h2>
                            </div>

                            <p className="reserve-left-desc">
                                Réservez directement en ligne ou contactez notre réception privée. Profitez du meilleur tarif garanti, d'une annulation flexible et d'un accueil sur mesure personnalisé dès votre arrivée à Bastos.
                            </p>

                            <ul className="reserve-features-list">
                                <li className="reserve-feature-item">
                                    <FontAwesomeIcon icon={faStar} className="reserve-star-icon" />
                                    <span>Meilleur tarif garanti sans frais ni commission intermédiaire</span>
                                </li>
                                <li className="reserve-feature-item">
                                    <FontAwesomeIcon icon={faStar} className="reserve-star-icon" />
                                    <span>Confirmation et attribution de chambre prioritaire en moins de 2h</span>
                                </li>
                                <li className="reserve-feature-item">
                                    <FontAwesomeIcon icon={faStar} className="reserve-star-icon" />
                                    <span>Cocktail VIP offert et surclassement selon disponibilité</span>
                                </li>
                                <li className="reserve-feature-item">
                                    <FontAwesomeIcon icon={faStar} className="reserve-star-icon" />
                                    <span>Service de navette aéroport privée et conciergerie 24/7</span>
                                </li>
                            </ul>

                            <div className="reserve-contact-cards">
                                <div className="reserve-contact-card">
                                    <div className="reserve-contact-icon">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div>
                                        <div className="reserve-contact-label">Téléphone Direct</div>
                                        <div className="reserve-contact-val">+237 6 71 00 08 88</div>
                                    </div>
                                </div>

                                <div className="reserve-contact-card">
                                    <div className="reserve-contact-icon">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div>
                                        <div className="reserve-contact-label">Email Réception</div>
                                        <div className="reserve-contact-val">reservation@starlandhotel.com</div>
                                    </div>
                                </div>

                                <div className="reserve-contact-card">
                                    <div className="reserve-contact-icon">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    </div>
                                    <div>
                                        <div className="reserve-contact-label">Adresse</div>
                                        <div className="reserve-contact-val">Quartier Bastos, Yaoundé, Cameroun</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Form with PUG inputs & custom dropdown */}
                        <div className="reserve-right-form-container">
                            {!formSubmitted ? (
                                <form id="reserveForm" onSubmit={handleFormSubmit}>
                                    {/* Field 1: Nom & Prénom grid (2, 1fr) */}
                                    <div className="form-row-grid-2">
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faUser} className="input-glow-icon" />
                                            <input 
                                                type="text" 
                                                className={`effect-20 ${nom ? 'has-content' : ''}`}
                                                value={nom} 
                                                onChange={(e) => setNom(e.target.value)} 
                                                required 
                                            />
                                            <label>Nom</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faUser} className="input-glow-icon" />
                                            <input 
                                                type="text" 
                                                className={`effect-20 ${prenom ? 'has-content' : ''}`}
                                                value={prenom} 
                                                onChange={(e) => setPrenom(e.target.value)} 
                                                required 
                                            />
                                            <label>Prénom</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 2: Email (1fr) */}
                                    <div className="form-row-full">
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faEnvelope} className="input-glow-icon" />
                                            <input 
                                                type="email" 
                                                className={`effect-20 ${emailInput ? 'has-content' : ''}`}
                                                value={emailInput} 
                                                onChange={(e) => setEmailInput(e.target.value)} 
                                                required 
                                            />
                                            <label>Email</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 3: Voyageurs (1fr custom dropdown) */}
                                    <div className="form-row-full">
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faUsers} className="input-glow-icon" />
                                            <div className={`custom-pug-dropdown ${isGuestsDropdownOpen ? 'is-open' : ''}`}>
                                                <div 
                                                    className="custom-pug-dropdown__face"
                                                    onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
                                                >
                                                    <span>{voyageurs}</span>
                                                    <div className="custom-pug-dropdown__arrow"></div>
                                                </div>
                                                <ul className="custom-pug-dropdown__items">
                                                    {[
                                                        '1 adulte', 
                                                        '2 adultes', 
                                                        '2 adultes · 1 enfant', 
                                                        '2 adultes · 2 enfants', 
                                                        '3 adultes', 
                                                        '4 adultes'
                                                    ].map((optionText) => (
                                                        <li 
                                                            key={optionText}
                                                            className={voyageurs === optionText ? 'selected' : ''}
                                                            onClick={() => {
                                                                setVoyageurs(optionText);
                                                                setIsGuestsDropdownOpen(false);
                                                            }}
                                                        >
                                                            {optionText}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <label className="dropdown-floating-label">
                                                Voyageurs / Nombre de personnes
                                            </label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 4: Arrivée & Départ grid (2, 1fr triggering custom calendar modal) */}
                                    <div className="form-row-grid-2">
                                        <div 
                                            className="col-input-effect date-trigger-field"
                                            onClick={() => setIsCalendarOpen(true)}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} className="input-glow-icon" />
                                            <input 
                                                type="text" 
                                                readOnly
                                                className={`effect-20 ${checkin ? 'has-content' : ''}`}
                                                value={checkin}
                                                placeholder=""
                                            />
                                            <label>Date d'Arrivée</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                        <div 
                                            className="col-input-effect date-trigger-field"
                                            onClick={() => setIsCalendarOpen(true)}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} className="input-glow-icon" />
                                            <input 
                                                type="text" 
                                                readOnly
                                                className={`effect-20 ${checkout ? 'has-content' : ''}`}
                                                value={checkout}
                                                placeholder=""
                                            />
                                            <label>Date de Départ</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 5: Téléphone (1fr) */}
                                    <div className="form-row-full">
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faPhone} className="input-glow-icon" />
                                            <input 
                                                type="tel" 
                                                className={`effect-20 ${phoneInput ? 'has-content' : ''}`}
                                                value={phoneInput} 
                                                onChange={(e) => setPhoneInput(e.target.value)} 
                                                required 
                                            />
                                            <label>Téléphone (+237)</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 6: Demande particulière (1fr) */}
                                    <div className="form-row-full">
                                        <div className="col-input-effect">
                                            <FontAwesomeIcon icon={faConciergeBell} className="input-glow-icon" />
                                            <input 
                                                type="text" 
                                                className={`effect-20 ${demandeParticuliere ? 'has-content' : ''}`}
                                                value={demandeParticuliere} 
                                                onChange={(e) => setDemandeParticuliere(e.target.value)} 
                                            />
                                            <label>Demande particulière (ex: étage élevé, lit king-size...)</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    {/* Field 7: Message (1fr) */}
                                    <div className="form-row-full">
                                        <div className="col-input-effect textarea-effect">
                                            <FontAwesomeIcon icon={faCommentAlt} className="input-glow-icon" />
                                            <textarea 
                                                className={`effect-20 ${messageInput ? 'has-content' : ''}`}
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                            ></textarea>
                                            <label>Message complémentaire (optionnel)</label>
                                            <span className="focus-border"><i></i></span>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="reserve__submit"
                                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                                    >
                                        Confirmer la réservation <FontAwesomeIcon icon={faPaperPlane} style={{ marginLeft: '10px' }} />
                                    </button>
                                </form>
                            ) : (
                                <div className="reserve__confirmation is-visible" id="reserveConfirmation">
                                    <div className="reserve__confirmation-icon">✓</div>
                                    <h3 className="reserve__confirmation-title">Demande reçue.</h3>
                                    <p className="reserve__confirmation-text">
                                        Notre réception vous confirme la disponibilité et le tarif par email sous deux heures ouvrées. Pour toute demande immédiate, téléphonez au <span style={{ color: 'var(--accent)' }}>+237 6 71 00 08 88</span>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Custom Date Range Calendar Modal */}
                <CustomCalendar 
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    onSelectDates={(startDate: string, endDate: string) => {
                        setCheckin(startDate);
                        setCheckout(endDate);
                    }}
                    initialStartDate={checkin}
                    initialEndDate={checkout}
                />
            </section>

            {/* FOOTER */}
            <footer className="footer" id="contact">
                <div className="footer__inner">
                    <div className="footer__top">
                        <div>
                            <div className="footer__brand-name">STAR LAND</div>
                            <div className="footer__brand-tag">Hôtel Bastos · Yaoundé · Cameroun</div>
                            <p className="footer__brand-desc">
                                Une maison familiale tenue depuis 2009. Quatre-vingt-quatre chambres, un restaurant, un spa, et le souci du détail. Note 4,3 sur Google — 688 avis vérifiés.
                            </p>
                            
                            {/* Social Icons Bar in Footer */}
                            <div className="footer-social-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.25rem' }}>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Facebook">
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Instagram">
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                                <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Tripadvisor">
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm7 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className="footer__col-title">Navigation</div>
                            <ul className="footer__list">
                                <li><a href="#about">L'hôtel</a></li>
                                <li><a href="#rooms">Chambres</a></li>
                                <li><a href="#dining">Restauration</a></li>
                                <li><a href="#amenities">Équipements</a></li>
                                <li><a href="#gallery">Galerie</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="footer__col-title">Contact</div>
                            <ul className="footer__list">
                                <li><a href="tel:+237671000888">6 71 00 08 88</a></li>
                                <li><a href="https://www.starlandhotel.com" target="_blank" rel="noopener noreferrer">www.starlandhotel.com</a></li>
                                <li>Bastos, Yaoundé III</li>
                                <li>Réception 24h/24</li>
                            </ul>
                        </div>
                        <div>
                            <div className="footer__col-title">Légal</div>
                            <ul className="footer__list">
                                <li><a href="#">Mentions légales</a></li>
                                <li><a href="#">Conditions générales</a></li>
                                <li><a href="#">Politique de confidentialité</a></li>
                                <li><a href="#">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <span>© 2024 STAR LAND HOTEL BASTOS · TOUS DROITS RÉSERVÉS</span>
                        <span>YAOUNDÉ · CAMEROUN</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;