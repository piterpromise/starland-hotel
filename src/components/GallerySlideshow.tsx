import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/gallerySlideshow.css';

interface GallerySlide {
    image: string;
    number: string;
    label: string;
    title: string;
    subtitle: string;
    details: ReactNode;
}

export default function GallerySlideshow({ slides }: { slides: GallerySlide[] }) {
    const slideshowRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (!slideshowRef.current || initialized.current) return;
        initialized.current = true;
        
        // 1. Charming logic
        const charming = function(e: any, n?: any) {
            n = n || {};
            var t = n.tagName || "span", o = null != n.classPrefix ? n.classPrefix : "char", r = 1;
            var a = function(e: any) {
                for (var n = e.parentNode, a = e.nodeValue, c = a.length, l = -1; ++l < c;) {
                    var d = document.createElement(t);
                    o && (d.className = o + r, r++);
                    d.appendChild(document.createTextNode(a[l]));
                    n.insertBefore(d, e);
                }
                n.removeChild(e);
            };
            return function c(e: any) {
                for (var n = [].slice.call(e.childNodes), t = n.length, o = -1; ++o < t;) c(n[o]);
                e.nodeType === Node.TEXT_NODE && a(e);
            }(e), e;
        };

        // 2. Math & Mouse utilities
        const getMousePos = (e: any) => {
            let posx = 0;
            let posy = 0;
            if (!e) e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return { x: posx, y: posy };
        };

        const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number) => {
            const m = (y2 - y1) / (x2 - x1);
            const b = y1 - m * x1;
            return m * currentVal + b;
        };

        const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',':',',','^'];
        const charsTotal = chars.length;

        const randomizeLetters = (letters: any[]) => {
            return new Promise<void>((resolve) => {
                const lettersTotal = letters.length;
                let cnt = 0;
                letters.forEach((letter: any, pos: number) => { 
                    let loopTimeout: ReturnType<typeof setTimeout>;
                    const loop = () => {
                        letter.innerHTML = chars[getRandomInt(0, charsTotal-1)];
                        loopTimeout = setTimeout(loop, getRandomInt(50, 500));
                    };
                    loop();
                    setTimeout(() => {
                        clearTimeout(loopTimeout);
                        letter.style.opacity = 1;
                        letter.innerHTML = letter.dataset.initial;
                        ++cnt;
                        if (cnt === lettersTotal) resolve();
                    }, pos * lineEq(40, 0, 8, 200, lettersTotal));
                });
            });
        };

        const disassembleLetters = (letters: any[]) => {
            return new Promise<void>((resolve) => {
                const lettersTotal = letters.length;
                let cnt = 0;
                letters.forEach((letter: any, pos: number) => {
                    setTimeout(() => {
                        letter.style.opacity = 0;
                        ++cnt;
                        if (cnt === lettersTotal) resolve();
                    }, pos * 30);
                });
            });
        };

        let winsize = { width: window.innerWidth, height: window.innerHeight };
        const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
        window.addEventListener('resize', calcWinsize);
        let allowTilt = true;

        class Slide {
            DOM: any;
            width: number;
            height: number;
            transforms: any[];
            mouseenterFn: any;
            mousemoveFn: any;
            mouseleaveFn: any;
            resizeFn: any;
            mousetime!: ReturnType<typeof setTimeout>;
            isCurrent: boolean;
            isRight: boolean;
            isLeft: boolean;

            constructor(el: any) {
                this.DOM = {el: el};
                this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
                this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');
                this.DOM.texts = {
                    wrap: this.DOM.el.querySelector('.slide__title-wrap'),
                    title: this.DOM.el.querySelector('.slide__title'),
                    number: this.DOM.el.querySelector('.slide__number'),
                    side: this.DOM.el.querySelector('.slide__side'),
                };
                charming(this.DOM.texts.title);
                charming(this.DOM.texts.side);
                this.DOM.titleLetters = Array.from(this.DOM.texts.title.querySelectorAll('span')).sort(() => 0.5 - Math.random());
                this.DOM.sideLetters = Array.from(this.DOM.texts.side.querySelectorAll('span')).sort(() => 0.5 - Math.random());
                this.DOM.titleLetters.forEach((letter: any) => letter.dataset.initial = letter.innerHTML);
                this.DOM.sideLetters.forEach((letter: any) => letter.dataset.initial = letter.innerHTML);
                this.width = 0;
                this.height = 0;
                this.transforms = [];
                this.isCurrent = false;
                this.isRight = false;
                this.isLeft = false;
                this.calcSizes();
                this.calcTransforms();
                this.initEvents();
            }
            calcSizes() {
                this.width = this.DOM.imgWrap.offsetWidth || winsize.width * 0.27;
                this.height = this.DOM.imgWrap.offsetHeight || winsize.height * 0.8;
            }
            calcTransforms() {
                this.transforms = [
                    {x: -1*(winsize.width/2+this.width), y: -1*(winsize.height/2+this.height), rotation: -30},
                    {x: -1*(winsize.width/2-this.width/3), y: -1*(winsize.height/2-this.height/3), rotation: 0},
                    {x: 0, y: 0, rotation: 0},
                    {x: winsize.width/2-this.width/3, y: winsize.height/2-this.height/3, rotation: 0},
                    {x: winsize.width/2+this.width, y: winsize.height/2+this.height, rotation: 30},
                    // Position 3 (Content open): expands image to 80vw with 10vw margins
                    {x: -1*(winsize.width * 0.265), y: 0, rotation: 0, expandWidth: winsize.width * 0.80}
                ];
            }
            initEvents() {
                this.mouseenterFn = () => {
                    if (!allowTilt || !this.isPositionedCenter()) return;
                    clearTimeout(this.mousetime);
                    this.mousetime = setTimeout(() => {
                        if (!allowTilt) return;
                        gsap.to(this.DOM.img, { duration: 0.8, ease: "power3.out", scale: 1.1 });
                    }, 40);
                };
                this.mousemoveFn = (ev: any) => requestAnimationFrame(() => {
                    if (!allowTilt || !this.isPositionedCenter()) return;
                    this.tilt(ev);
                });
                this.mouseleaveFn = () => requestAnimationFrame(() => {
                    if (!allowTilt || !this.isPositionedCenter()) return;
                    clearTimeout(this.mousetime);
                    gsap.to([this.DOM.imgWrap, this.DOM.texts.wrap], { duration: 1.8, ease: "power4.out", x: 0, y: 0, rotationX: 0, rotationY: 0 });
                    gsap.to(this.DOM.img, { duration: 1.8, ease: "power4.out", scale: 1 });
                });
                this.resizeFn = () => {
                    this.calcSizes();
                    this.calcTransforms();
                };
                this.DOM.imgWrap.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.imgWrap.addEventListener('mousemove', this.mousemoveFn);
                this.DOM.imgWrap.addEventListener('mouseleave', this.mouseleaveFn);
                window.addEventListener('resize', this.resizeFn);
            }
            tilt(ev: any) {
                if (!allowTilt || !this.isPositionedCenter()) return;
                const mousepos = getMousePos(ev);
                const docScrolls = { left: document.body.scrollLeft + document.documentElement.scrollLeft, top: document.body.scrollTop + document.documentElement.scrollTop };
                const bounds = this.DOM.imgWrap.getBoundingClientRect();
                const relmousepos = { x: mousepos.x - bounds.left - docScrolls.left, y: mousepos.y - bounds.top - docScrolls.top };
                let t = {x:[-20,20],y:[-20,20]}, r = {x:[-15,15],y:[-15,15]};
                const transforms = {
                    translation: { x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0], y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0] },
                    rotation: { x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0], y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0] }
                };
                gsap.to(this.DOM.imgWrap, { duration: 1.5, ease: "power1.out", x: transforms.translation.x, y: transforms.translation.y, rotationX: transforms.rotation.x, rotationY: transforms.rotation.y }); 
                gsap.to(this.DOM.texts.wrap, { duration: 1.5, ease: "power1.out", x: -1*transforms.translation.x, y: -1*transforms.translation.y }); 
            }
            position(pos: number) {
                gsap.set(this.DOM.imgWrap, { x: this.transforms[pos].x, y: this.transforms[pos].y, rotationX: 0, rotationY: 0, opacity: 1, rotationZ: this.transforms[pos].rotation, width: '100%' });
            }
            setCurrent(isContentOpen?: boolean) {
                this.isCurrent = true;
                this.DOM.el.classList.add('slide--current', 'slide--visible');
                this.position(isContentOpen ? 5 : 2);
            }
            setLeft(isContentOpen?: boolean) {
                this.isRight = this.isCurrent = false;
                this.isLeft = true;
                this.DOM.el.classList.add('slide--visible');
                this.position(isContentOpen ? 0 : 1);
            }
            setRight(isContentOpen?: boolean) {
                this.isLeft = this.isCurrent = false;
                this.isRight = true;
                this.DOM.el.classList.add('slide--visible');
                this.position(isContentOpen ? 4 : 3);
            }
            isPositionedRight() { return this.isRight; }
            isPositionedLeft() { return this.isLeft; }
            isPositionedCenter() { return this.isCurrent; }
            reset() {
                this.isRight = this.isLeft = this.isCurrent = false;
                this.DOM.el.className = 'slide';
                gsap.set(this.DOM.imgWrap, { width: '100%' });
            }
            hide() {
                gsap.set(this.DOM.imgWrap, {x:0, y:0, rotationX:0, rotationY:0, rotationZ:0, opacity:0, width: '100%'});
            }
            moveToPosition(settings: any) {
                return new Promise<void>((resolve) => {
                    const targetTransform = this.transforms[settings.position+2];
                    let toObj: any = {
                        ease: "power4.inOut",
                        delay: settings.delay || 0,
                        x: targetTransform.x,
                        y: targetTransform.y,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: targetTransform.rotation,
                        onComplete: resolve
                    };

                    if (targetTransform.expandWidth) {
                        toObj.width = targetTransform.expandWidth;
                    } else {
                        toObj.width = '100%';
                    }

                    if (settings.from !== undefined) {
                        const fromTransform = this.transforms[settings.from+2];
                        gsap.set(this.DOM.imgWrap, {
                            x: fromTransform.x,
                            y: fromTransform.y,
                            rotationX: 0,
                            rotationY: 0,
                            rotationZ: fromTransform.rotation,
                            opacity: 1,
                            width: fromTransform.expandWidth ? fromTransform.expandWidth : '100%'
                        });
                    }
                    gsap.to(this.DOM.imgWrap, { duration: 0.8, ...toObj });
                    if (settings.resetImageScale) {
                        gsap.to(this.DOM.img, { duration: 0.8, ease: "power4.inOut", scale: 1 });
                    }
                });
            }
            hideTexts(animation = false) {
                if (animation) {
                    disassembleLetters(this.DOM.titleLetters).then(() => gsap.set(this.DOM.texts.wrap, {opacity: 0}));
                    disassembleLetters(this.DOM.sideLetters).then(() => gsap.set(this.DOM.texts.side, {opacity: 0}));
                } else {
                    gsap.set(this.DOM.texts.wrap, {opacity: 0});
                    gsap.set(this.DOM.texts.side, {opacity: 0});
                }
            }
            showTexts(animation = true) {
                gsap.set(this.DOM.texts.wrap, {opacity: 1});
                gsap.set(this.DOM.texts.side, {opacity: 1});
                if (animation) { 
                    randomizeLetters(this.DOM.titleLetters);
                    randomizeLetters(this.DOM.sideLetters);
                    gsap.fromTo(this.DOM.texts.number, {x: '-50%', opacity: 0}, { duration: 0.6, ease: "elastic.out(1,0.5)", x: '0%', opacity: 1 });
                }
            }
        }

        class Content {
            DOM: any;
            slideshowRef: any;

            constructor(el: any, slideshowRef: any) {
                this.DOM = {el: el};
                this.DOM.number = this.DOM.el.querySelector('.content__number');
                this.DOM.title = this.DOM.el.querySelector('.content__title');
                this.DOM.subtitle = this.DOM.el.querySelector('.content__subtitle');
                this.DOM.text = this.DOM.el.querySelector('.content__text');
                this.DOM.backCtrl = (el.closest('.gallery-wrapper') || document).querySelector('.content__close');
                this.slideshowRef = slideshowRef;
            }
            show() {
                this.DOM.el.classList.add('content__item--current');
                gsap.to(this.DOM.el, { opacity: 1, duration: 0.4 });
                const targets = [this.DOM.backCtrl, this.DOM.number, this.DOM.title, this.DOM.subtitle, this.DOM.text].filter(Boolean);
                gsap.fromTo(targets, 
                    { y: 30, opacity: 0 }, 
                    { duration: 0.8, ease: "power4.out", delay: 0.2, opacity: 1, y: 0, stagger: 0.05 }
                );
            }
            hide() {
                this.DOM.el.classList.remove('content__item--current');
                gsap.to(this.DOM.el, { opacity: 0, duration: 0.3 });
                const targets = [this.DOM.backCtrl, this.DOM.number, this.DOM.title, this.DOM.subtitle, this.DOM.text].filter(Boolean).reverse();
                gsap.to(targets, 
                    { duration: 0.3, ease: "power3.in", opacity: 0, y: 10, stagger: 0.01 }
                );
            }
        }

        class Slideshow {
            DOM: any;
            slides: any[] = [];
            slidesTotal: number = 0;
            current: number = 0;
            contents: any[] = [];
            currentSlide: any;
            nextSlide: any;
            prevSlide: any;
            clickFn: any;
            resizeFn: any;
            isContentOpen: boolean = false;
            isAnimating: boolean = false;
            upcomingSlide: any;

            constructor(el: any) {
                this.DOM = {el: el};
                this.slides = [];
                Array.from(this.DOM.el.querySelectorAll('.slide')).forEach((slideEl: any) => this.slides.push(new Slide(slideEl)));
                this.slidesTotal = this.slides.length;
                this.current = 0;
                this.isContentOpen = false;
                this.isAnimating = false;
                if (this.slidesTotal < 3) return;
                this.contents = [];
                const galleryWrapper = this.DOM.el.closest('.gallery-wrapper') || document;
                Array.from(galleryWrapper.querySelectorAll('.content > .content__item')).forEach((contentEl: any) => this.contents.push(new Content(contentEl, this)));
                
                this.render();
                this.currentSlide.showTexts(false);
                this.initEvents();
                
                const backCtrl = galleryWrapper.querySelector('.content__close');
                if(backCtrl) {
                    backCtrl.addEventListener('click', () => this.hideContent());
                }
            }
            render() {
                this.currentSlide = this.slides[this.current];
                this.nextSlide = this.slides[this.current+1 <= this.slidesTotal-1 ? this.current+1 : 0];
                this.prevSlide = this.slides[this.current-1 >= 0 ? this.current-1 : this.slidesTotal-1];
                this.currentSlide.setCurrent();
                this.nextSlide.setRight();
                this.prevSlide.setLeft();
            }
            initEvents() {
                this.clickFn = (slide: any) => {
                    if (slide.isPositionedRight()) this.navigate('next');
                    else if (slide.isPositionedLeft()) this.navigate('prev');
                    else this.showContent();
                };
                for (let slide of this.slides) {
                    slide.DOM.imgWrap.addEventListener('click', () => this.clickFn(slide));
                }
                
                const galleryWrapper = this.DOM.el.closest('.gallery-wrapper') || document;
                const btnNext = galleryWrapper.querySelector('.gallery-nav--next');
                const btnPrev = galleryWrapper.querySelector('.gallery-nav--prev');
                if(btnNext) btnNext.addEventListener('click', () => this.navigate('next'));
                if(btnPrev) btnPrev.addEventListener('click', () => this.navigate('prev'));

                this.resizeFn = () => {
                    this.nextSlide.setRight(this.isContentOpen);
                    this.prevSlide.setLeft(this.isContentOpen);
                    this.currentSlide.setCurrent(this.isContentOpen);
                };
                window.addEventListener('resize', this.resizeFn);
            }
            showContent() {
                if (this.isContentOpen || this.isAnimating) return;
                allowTilt = false;
                this.isContentOpen = true;
                this.DOM.el.classList.add('slideshow--previewopen');

                // Kill any pending tilt animations on slide elements
                [this.currentSlide, this.prevSlide, this.nextSlide].forEach((slide: any) => {
                    if (slide && slide.DOM && slide.DOM.imgWrap) {
                        gsap.killTweensOf(slide.DOM.imgWrap);
                        gsap.killTweensOf(slide.DOM.texts.wrap);
                    }
                });

                // Recalculate sizes and transforms
                calcWinsize();
                this.currentSlide.calcSizes();
                this.currentSlide.calcTransforms();
                this.prevSlide.calcSizes();
                this.prevSlide.calcTransforms();
                this.nextSlide.calcSizes();
                this.nextSlide.calcTransforms();

                this.prevSlide.moveToPosition({position: -2});
                this.nextSlide.moveToPosition({position: 2});
                this.currentSlide.moveToPosition({position: 3, resetImageScale: true});
                if (this.contents[this.current]) {
                    this.contents[this.current].show();
                }
                this.currentSlide.hideTexts(true);
            }
            hideContent() {
                if (!this.isContentOpen || this.isAnimating) return;
                this.DOM.el.classList.remove('slideshow--previewopen');
                if (this.contents[this.current]) {
                    this.contents[this.current].hide();
                }
                this.prevSlide.moveToPosition({position: -1});
                this.nextSlide.moveToPosition({position: 1});
                this.currentSlide.moveToPosition({position: 0}).then(() => {
                    allowTilt = true;
                    this.isContentOpen = false;
                });
                this.currentSlide.showTexts();
            }
            navigate(direction: string) {
                if (this.isAnimating) return;
                this.isAnimating = true;
                allowTilt = false;
                const upcomingPos = direction === 'next' ? 
                        this.current < this.slidesTotal-2 ? this.current+2 : Math.abs(this.slidesTotal-2-this.current):
                        this.current >= 2 ? this.current-2 : Math.abs(this.slidesTotal-2+this.current);
                this.upcomingSlide = this.slides[upcomingPos];
                this.current = direction === 'next' ? 
                        this.current < this.slidesTotal-1 ? this.current+1 : 0 :
                        this.current > 0 ? this.current-1 : this.slidesTotal-1;
                
                this.prevSlide.moveToPosition({position: direction === 'next' ? -2 : 0, delay: direction === 'next' ? 0 : 0.14}).then(() => {
                    if (direction === 'next') this.prevSlide.hide();
                });
                this.currentSlide.moveToPosition({position: direction === 'next' ? -1 : 1, delay: 0.07 });
                this.currentSlide.hideTexts();
                this.nextSlide.moveToPosition({position: direction === 'next' ? 0 : 2, delay: direction === 'next' ? 0.14 : 0 }).then(() => {
                    if (direction === 'prev') this.nextSlide.hide();
                });
                if (direction === 'next') this.nextSlide.showTexts();
                else this.prevSlide.showTexts();
                
                this.upcomingSlide.moveToPosition({position: direction === 'next' ? 1 : -1, from: direction === 'next' ? 2 : -2, delay: 0.21 }).then(() => {
                    [this.nextSlide, this.currentSlide, this.prevSlide].forEach((slide: any) => slide.reset());
                    this.render();
                    allowTilt = true;
                    this.isAnimating = false;
                });
            }
        }

        // Initialize slideshow
        new Slideshow(slideshowRef.current);

        return () => {
            window.removeEventListener('resize', calcWinsize);
        };
    }, []);

    return (
        <div className="gallery-wrapper">
            <svg className="hidden" style={{display: 'none'}}>
                <symbol id="icon-arrow" viewBox="0 0 24 24">
                    <title>arrow</title>
                    <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
                </symbol>
                <symbol id="icon-drop" viewBox="0 0 24 24">
                    <title>drop</title>
                    <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"/><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"/>
                </symbol>
                <symbol id="icon-longarrow" viewBox="0 0 800 800">
                    <title>longarrow</title>
                    <path d="M605.3,383H86v33h519.3L452.9,568.4l23.3,23.3L677,399.5L476.3,198.8l-23.3,23.3L605.3,383z"/>
                </symbol>
                <symbol id="icon-navarrow" viewBox="0 0 400 400">
                    <title>navarrow</title>
                    <path d="M260.6,183.5H38v33h222.6l-66.9,66.9l23.3,23.3l106.1-106.1l-106-106.1l-23.3,23.3L260.6,183.5z"/>
                </symbol>
            </svg>

            {/* Side-by-side prev and next navigation arrows in top-right */}
            <div className="gallery-nav-group">
                <button className="gallery-nav gallery-nav--prev" aria-label="Précédent">
                    <svg className="icon icon--navarrow-prev">
                        <use xlinkHref="#icon-navarrow"></use>
                    </svg>
                </button>
                <button className="gallery-nav gallery-nav--next" aria-label="Suivant">
                    <svg className="icon icon--navarrow-next">
                        <use xlinkHref="#icon-navarrow"></use>
                    </svg>
                </button>
            </div>

            <div className="slideshow" ref={slideshowRef}>
                {slides.map((slide, i) => (
                    <div className="slide" key={i}>
                        <div className="slide__img-wrap">
                            <div className="slide__img" style={{ backgroundImage: `url(${slide.image})` }}></div>
                        </div>
                        <div className="slide__side">{slide.subtitle}</div>
                        <div className="slide__title-wrap">
                            <span className="slide__number">{slide.label}</span>
                            <h3 className="slide__title">{slide.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="content">
                {slides.map((slide, i) => (
                    <div className="content__item" key={i}>
                        <span className="content__number">{slide.label}</span>
                        <h3 className="content__title">{slide.title}</h3>
                        <h4 className="content__subtitle">{slide.subtitle}</h4>
                        <div className="content__text">
                            {slide.details}
                        </div>
                    </div>
                ))}
                <button className="content__close" aria-label="Retour à la galerie">
                    <svg className="icon icon--longarrow">
                        <use xlinkHref="#icon-longarrow"></use>
                    </svg>
                </button>
            </div>
        </div>
    );
}
