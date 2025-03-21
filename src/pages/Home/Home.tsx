import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Our Laboratory</h1>
                    <p>Bienville offers two different but complementary investment solutions: Asset Management and Advisory Services.</p>
                </div>
            </section>

            <section className="stats">
                <div className="stat-item">
                    <h2>2008</h2>
                    <p>FOUNDED IN</p>
                </div>
                <div className="stat-item">
                    <h2>NYC</h2>
                    <p>HEADQUARTERS</p>
                </div>
                <div className="stat-item">
                    <h2>27</h2>
                    <p>PEOPLE</p>
                </div>
            </section>

            <section className="explore">
                <h2>EXPLORE</h2>
                <div className="explore-buttons">
                    <button className="explore-btn">VIDEO</button>
                    <button className="explore-btn">ABOUT</button>
                    <button className="explore-btn">TEAM</button>
                    <button className="explore-btn">VISION</button>
                </div>
            </section>
            <section className="explore">
                <h2>EXPLORE</h2>
                <div className="explore-buttons">
                    <button className="explore-btn">VIDEO</button>
                    <button className="explore-btn">ABOUT</button>
                    <button className="explore-btn">TEAM</button>
                    <button className="explore-btn">VISION</button>
                </div>
            </section>
            <section className="explore">
                <h2>EXPLORE</h2>
                <div className="explore-buttons">
                    <button className="explore-btn">VIDEO</button>
                    <button className="explore-btn">ABOUT</button>
                    <button className="explore-btn">TEAM</button>
                    <button className="explore-btn">VISION</button>
                </div>
            </section>

            <section className="contact">
                <h2>CONTACT</h2>
                <div className="contact-buttons">
                    <button className="contact-btn">EMAIL</button>
                    <button className="contact-btn">CALL</button>
                    <button className="contact-btn">MAPS</button>
                </div>
            </section>
        </div>
    );
};

export default Home;