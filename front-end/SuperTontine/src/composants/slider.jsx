import React from 'react'
import '../styles/slider.css'
import 'boxicons';
import axios from 'axios';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';



export default function Slider() {
  const navigate = useNavigate()

  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  let timeoutId;
  const [tontinedata, setTontinedata] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:3001/Tontines`).then((res)=>{
      setTontinedata(res.data);
    })
  })

  useEffect(() => {

    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    const firstCardWidth = carousel.querySelector('.card').offsetWidth;
    const arrowBtns = wrapper.querySelectorAll('i');
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
      if (!wrapper.matches(':hover')) autoPlay();
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
    wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    wrapper.addEventListener('mouseleave', autoPlay);

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
      wrapper.removeEventListener('mouseenter', () => clearTimeout(timeoutId));
      wrapper.removeEventListener('mouseleave', autoPlay);
    };
  }, [isDragging, isAutoPlay]);

  return (
    <div>
      <div class="wrapper" ref={wrapperRef}>
        <div className='titre'>
          <h1> Mes tontines</h1>
        </div>
      <i id="left" ><box-icon type='solid' color='blue' name='chevron-left'></box-icon></i>
      <ul class="carousel" ref={carouselRef}>
        {tontinedata.map((tontine) => (       
           <li class="card">
          <div class="img" > </div>
          <h2>{tontine.name}</h2>
          <span > {tontine.participants} membres</span>
          <div className='description'>  <span >{tontine.description}</span> </div>
          <button  > <NavLink to="/home/tontine"> voir plus </NavLink> </button>
        </li>
        )
        )} 
      </ul>
      <i id="right"><box-icon type='solid' color='blue' name='chevron-right'></box-icon></i>
    </div>
    </div>
  );
};