import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../styles/slider.css';

export default function Slider() {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [tontinedata, setTontinedata] = useState([]);

  useEffect(() => {
    const fetchTontines = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Tontines');
        setTontinedata(response.data);
      } catch (error) {
        console.error('Error fetching tontines:', error);
      }
    };

    fetchTontines();

    const carousel = carouselRef.current;

    const handleAutoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      carousel.scrollLeft += carousel.offsetWidth;
    };

    const intervalId = setInterval(handleAutoPlay, 1500);

    return () => clearInterval(intervalId);
  }, [isAutoPlay]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className='titre'>
        <h1> Mes tontines</h1>
      </div>
      <i id="left" onClick={() => carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth}>
        <box-icon type='solid' color='blue' name='chevron-left'></box-icon>
      </i>
      <ul className="carousel" ref={carouselRef}>
        {tontinedata.map((tontine) => (
          <li key={tontine.id} className="card">
            <div className="img"></div>
            <h2>{tontine.name}</h2>
            <span>{tontine.participants} membres</span>
            <div className='description'>
              <span>{tontine.description}</span>
            </div>
            <button><NavLink to="/home/tontine">Voir plus</NavLink></button>
          </li>
        ))}
      </ul>
      <i id="right" onClick={() => carouselRef.current.scrollLeft += carouselRef.current.offsetWidth}>
        <box-icon type='solid' color='blue' name='chevron-right'></box-icon>
      </i>
    </div>
  );
};
