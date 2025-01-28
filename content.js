// Function to add control buttons to the video
function addControlButtons(video) {
    if (video.parentNode.querySelector(".video-speed-controller")) return; // Avoid duplicate buttons
  
    // Create container for controls
    const controlContainer = document.createElement("div");
    controlContainer.className = "video-speed-controller";
  
    // Create decrease speed button
    const decreaseButton = document.createElement("button");
    decreaseButton.innerText = "-";
    decreaseButton.className = "speed-btn";
    decreaseButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent affecting the video
      event.preventDefault(); // Prevent default behavior
      video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
      
    });
  
    // Create increase speed button
    const increaseButton = document.createElement("button");
    increaseButton.innerText = "+";
    increaseButton.className = "speed-btn";
    increaseButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent affecting the video
      event.preventDefault(); // Prevent default behavior
      video.playbackRate += 0.1;
      
    });
  
    // Append buttons to the container
    controlContainer.appendChild(decreaseButton);
    controlContainer.appendChild(increaseButton);
  
    // Add container to the video element
    video.parentNode.style.position = "relative"; // Ensure the parent has relative positioning
    controlContainer.style.position = "absolute";
    controlContainer.style.top = "10px";
    controlContainer.style.left = "10px"; // Move to the left side of the video
    video.parentNode.appendChild(controlContainer);
  }
  
  // Function to handle key presses for speed control
  function handleKeyPress(event) {
    const videos = document.querySelectorAll("video");
    if (videos.length === 0) return;
  
    videos.forEach((video) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return; // Ignore keypresses in input fields
      if (event.key === "s") {
        // Decrease speed
        video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
       
      } else if (event.key === "d") {
        // Increase speed
        video.playbackRate += 0.1;
        
      }
    });
  }
  
  // Observe the DOM for dynamically loaded videos
  const observer = new MutationObserver(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => addControlButtons(video));
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Add event listener for key presses
  document.addEventListener("keydown", handleKeyPress);
  
  // Initialize buttons for any videos already on the page
  document.querySelectorAll("video").forEach((video) => addControlButtons(video));
  