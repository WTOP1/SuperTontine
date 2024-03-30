import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../styles/slider.css'

export default function Slider() {

  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  let timeoutId;
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
    const firstCard = carousel.querySelector('.card');

    if (firstCard) {
      const firstCardWidth = firstCard.offsetWidth;
      const arrowBtns = wrapperRef.current.querySelectorAll('i');
      const carouselChildrens = [...carousel.children];

      let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
      });

      carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML('beforeend', card.outerHTML);
      });

      carousel.classList.add('no-transition');
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove('no-transition');

      arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.id === 'left') {
            carousel.scrollLeft -= firstCardWidth;
          } else {
            carousel.scrollLeft += firstCardWidth;
          }
        });
      });

      const dragStart = (e) => {
        setIsDragging(true);
        carousel.classList.add('dragging');
        setStartX(e.pageX);
        setStartScrollLeft(carousel.scrollLeft);
      };

      const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
      };

      const dragStop = () => {
        setIsDragging(false);
        carousel.classList.remove('dragging');
      };

      const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
          carousel.classList.add('no-transition');
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove('no-transition');
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add('no-transition');
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove('no-transition');
        }

        clearTimeout(timeoutId);
        if (!wrapperRef.current.matches(':hover')) autoPlay();
      };

      const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
      };

      autoPlay();

      carousel.addEventListener('mousedown', dragStart);
      carousel.addEventListener('mousemove', dragging);
      document.addEventListener('mouseup', dragStop);
      carousel.addEventListener('scroll', infiniteScroll);
      wrapperRef.current.addEventListener('mouseenter', () => clearTimeout(timeoutId));
      wrapperRef.current.addEventListener('mouseleave', autoPlay);

      return () => {
        arrowBtns.forEach(btn => {
          btn.removeEventListener('click', () => {
            carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
          });
        });
        carousel.removeEventListener('mousedown', dragStart);
        carousel.removeEventListener('mousemove', dragging);
        document.removeEventListener('mouseup', dragStop);
        carousel.removeEventListener('scroll', infiniteScroll);
        wrapperRef.current.removeEventListener('mouseenter', () => clearTimeout(timeoutId));
        wrapperRef.current.removeEventListener('mouseleave', autoPlay);
      };
    }
  }, [isDragging, isAutoPlay]);

  return (
    <div >
      <div className="wrapper" ref={wrapperRef}>
        <div className='titre'>
          <h1> Mes tontines</h1>
        </div>
        <i id="left" ><box-icon type='solid' color='blue' name='chevron-left'></box-icon></i>
        <ul className="carousel" ref={carouselRef}>
          {tontinedata.map((tontine) => (
            <li key={tontine.id} className="card">
              <div className="img" ></div>
              <h2>{tontine.name}</h2>
              <span>{tontine.participants} membres</span>
              <div className='description'>
                <span>{tontine.description}</span>
              </div>
              <button><NavLink to="/home/tontine">Voir plus</NavLink></button>
            </li>
          ))}
        </ul>
        <i id="right"><box-icon type='solid' color='blue' name='chevron-right'></box-icon></i>
      </div>
    </div>
  );
};
