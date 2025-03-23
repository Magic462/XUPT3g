import React, { useState, useEffect } from 'react';
// import styles from './Home.module.scss';
import './Home.scss'

const Home: React.FC = () => {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    const platforms = [
        { id: 'web', name: 'Web', delay: 0 },
        { id: 'server', name: 'Server', delay: 200 },
        { id: 'android', name: 'Android', delay: 400 },
        { id: 'ios', name: 'iOS', delay: 600 },
        { id: 'harmony', name: '鸿蒙', delay: 800 },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const platformsSection = document.querySelector('.platforms-section');
            if (platformsSection) {
                const sectionTop = platformsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop < windowHeight * 0.8) {
                    platforms.forEach((platform, index) => {
                        setTimeout(() => {
                            setVisibleCards(prev => [...new Set([...prev, index])]);
                        }, platform.delay);
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-container">
            <section className="hero">
              <div className="hero-content"> 
                <div className="hero-gif">
                  < img src="./src/assets/layoutback.gif" alt="" />
                </div>
                <div className="hero-tip">
                  <h1>西邮移动应用开发实验室</h1>
                  <p>探索移动应用开发的无限可能</p >
                </div>
        </div>
            </section>

            <section className="platforms-section">
                <h2>技术平台</h2>
                <div className="platforms-container">
                    {platforms.map((platform, index) => (
                        <div
                            key={platform.id}
                            className={`platform-card ${visibleCards.includes(index) ? 'show' : ''}`}
                            style={{
                                transform: visibleCards.includes(index)
                                    ? 'translateY(0) translateX(0)'
                                    : 'translateY(100px) translateX(100px)',
                                transitionDelay: `${platform.delay}ms`
                            }}
                        >
                            <h3>{platform.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="home-footer">
                <div className="footer-links">
                    <a href="#">关于我们</a>
                    <a href="#">加入我们</a>
                    <a href="#">联系我们</a>
                </div>
                <div className="copyright">
                    © 2024 西邮移动应用开发实验室. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;