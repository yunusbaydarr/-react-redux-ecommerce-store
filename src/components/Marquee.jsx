import React from 'react'
import '../css/Marquee.css'

function Marquee() {
    const marqueeText = "I extend my gratitude to Muhammad Ovi from dummyjson.com for providing this detailed API, containing 150 products, free of charge.    |   150 adet ürünü içeren bu detaylı API'yi ücretsiz bir şekilde sağladığı için dummyjson.com 'dan Muhammad Ovi'ye şükranlarımı sunarım...  ";
  return (
<div className="marquee-container">
          <div className="marquee-content">
             <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span> {/* Daha uzun veya daha geniş ekranlar için bir kopya daha */}
          </div>
        </div>

  )
}

export default Marquee
