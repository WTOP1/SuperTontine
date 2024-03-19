import React from 'react'
import '../styles/slider.css'
import 'boxicons';

export default function Slider() {



  return (
    <div>
      <div class="wrapper">
        <div className='titre'>
          <h1> Mes tontines</h1>
        </div>
      <i ><box-icon type='solid' color='blue' name='chevron-left'></box-icon></i>
      <ul class="carousel">
        <li class="card">
          <div class="img"><img src="images/img-1.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_1</h2> <br />
          <span>50 membres </span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-2.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_2</h2> <br />
          <span>25 membres</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-3.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_3</h2> <br />
          <span>50 membres</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-4.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_4</h2> <br />
          <span>30 memebres</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-5.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_5</h2>
          <span>45 membres</span>
        </li>
        <li class="card">
          <div class="img"><img src="images/img-6.jpg" alt="img" draggable="false" /></div>
          <h2>Tontine_6</h2>
          <span>14 membres</span>
        </li>
      </ul>
      <i ><box-icon type='solid' color='blue' name='chevron-right'></box-icon></i>
    </div>
    </div>
  )
}
