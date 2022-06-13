import React, { useState, useEffect } from 'react'

export default function DetectSpeed() {
  const [speedDesc, setSpeedDesc] = useState('')

  useEffect(() => {
    let userImageLink = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    let time_start, end_time;

    // The size in bytes
    // let downloadSize = 5616998;
    let downloadSize = 81 * 1024;
    let downloadImgSrc = new Image();

    downloadImgSrc.onload = function () {
      end_time = new Date().getTime();
      displaySpeed();
    };
    time_start = new Date().getTime();
    downloadImgSrc.src = userImageLink;
    // document.write("time start: " + time_start);
    // document.write("<br>");

    function displaySpeed() {
      let timeDuration = (end_time - time_start) / 1000;
      // let loadedBits = downloadSize * 8;
      let loadedBits = downloadSize;
      
      /* Converts a number into string
          using toFixed(2) rounding to 2 */
      let bps = (loadedBits / timeDuration).toFixed(2);
      let speedInKbps = (bps / 1024).toFixed(2);
      let speedInMbps = (speedInKbps / 1024).toFixed(2);
      console.log("Your internet connection speed is: \n" 
        + bps + " bps\n" + speedInKbps 
        + " kbps\n" + speedInMbps + " Mbps\n");
      setSpeedDesc(`Your internet connection speed is: ${bps}  bps ${speedInKbps} kbps ${speedInMbps}  Mbps`)
    }
  }, [])

  return (
    <>
      <div>DetectSpeed</div>
      <div>{ JSON.stringify(speedDesc) }</div>
    </>
  )
}
