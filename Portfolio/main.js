  //Declaring arrays for dialogue box and background button changing text content.
  const backgrounds = [
    "url('images/background.png')",
    "url('images/background1.jpg')",
    "url('images/background2.jpg')",
    "url('images/background3.jpg')",
    "url('images/background4.jpg')"
  ];

  //Declaring a function to set the initial background image.
  function setInitialBackground() {
    document.body.style.backgroundImage = backgrounds[0];
  }
  //Calling the function.
  setInitialBackground();

  //Declaring dialogue box and special butterfly variables 
  const dialogueBox = document.querySelector('.dialogue-box');
  const specialButterfly = document.querySelector('.butterfly img');

  let variantDisplayed = false;
  //Declaring a function to center the special butterfly on the screen.
  function positionButterfly() {
    const centerX = window.innerWidth / 2 - specialButterfly.width / 2;
    const centerY = window.innerHeight / 2.5 - specialButterfly.height / 2;
    specialButterfly.style.display = 'block';
    specialButterfly.style.transition = '1s ease-in-out';
    specialButterfly.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.2)`;

    if (variantDisplayed && currentBackgroundIndex === 1) {
      specialButterfly.style.display = 'none';
    }

    if (currentBackgroundIndex === 2) {
      specialButterfly.style.transition = '1s ease-in-out';
      specialButterfly.style.transform = `translate(${930}px, ${5}px) scale(1.2)`; 
    }
  }

    let mouseMoved = false;
    //Adding event listener for when the mouse is moved after opening the webpage.
    window.addEventListener('mousemove', () => {
      if (!mouseMoved) { 
        alert('Move the mouse over the centered butterfly');
        mouseMoved = true;
      }

      specialButterfly.style.display = 'block';
      positionButterfly();
    });

    //Declaring variables for the user's input, resulting outputBox and the submit button.
    const backgroundButton = document.querySelector('.background-button');
    const flipContainer = document.querySelector('.flip-container');    
    const flipper = document.querySelector('.flipper');
    const nextPage = document.querySelector('.next');
    const previousPage = document.querySelector('.previous');
    const submitButton = document.querySelector('.submit-button');
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    let currentBackgroundIndex = 0;
    let dialogueBoxDispalyed = false;

    const dialogues = [
      "Hello there, Welcome to Flutterfields, home to the animated butterflies. What's your name?",
      "I bet you've never had a butterfly of your own. Let's make you a navigation butterfly. It'll help you proceed to the next project or proceed to the fens! Choose a color: ",
      "Welcome to FlutterClub, notice the lights? I agree, the synchronized fluttering is kind of cringe. Well no need to wait any longer, let's go home.",
      "We're home! Thanks for staying for the journey, I hope you enjoyed it too. I bet next time you visit they'll be more features, for now, you can use the social links my friends have to reach her. They even have one that let's you view her other projects! In conclusion, if you want a website of your own, tap the button below and let her make your personal/business web presence dreams come true!"
    ];

    //Adding event listener for when the mouse hovers over the special butterfly.
    specialButterfly.addEventListener('mouseover', () => {
      if (!dialogueBoxDispalyed) {
      dialogueBox.style.display = 'block';
      dialogueBoxDispalyed = true;
      positionButterfly();
      }
    });
 
    const backgroundButtonText = [
      "Sure, why not!",
      "Dope, Let's go!",
      "Tell me more!",
      "Gladly!",
      "Hire Her Now!"
    ];  

    //Declaring a function that changes the content of the dialogue box and background changing button.
    function updateContent() {
      dialogueBox.querySelector('p').textContent = dialogues[currentBackgroundIndex];
      backgroundButton.querySelector('p').innerText = backgroundButtonText[currentBackgroundIndex];
    }
      //Calling the function.
      updateContent();

      const variant = document.getElementById('variant');
      const variantContainer = document.querySelector('.variant-container');
      const variantText = document.getElementById('variant-text');
      const variantName = document.getElementById('variant-name');
      const button = document.querySelector('.variant-button');

      //Adding an event listener for when the submit button is clicked.
      submitButton.addEventListener('click', () => {        
          const userInput = input.value;
          output.textContent = `Nice to meet you ${userInput}. We blue butterflies are on our way to the fens, but before we get there we'll check on our developer's other projects. Care to join us?`;
          submitButton.style.display = 'none';
          input.style.display = 'none';
          output.style.display = 'block';
          backgroundButton.style.display = 'block';
          dialogueBox.style.display = 'none';
      });

      button.addEventListener('click', () => {
        const name = variantName.value;
        variantText.textContent = `Hi, I'm ${name}. Got to fly, bye!`;
        button.style.display = 'none';
        variantName.style.display = 'none';
        variantText.style.display = 'block';
        backgroundButton.style.display = 'block';
        variantContainer.style.display = 'none';
        variant.style.display = 'block';
        specialButterfly.style.display = 'none';
        variantDisplayed = true;
      });

      function activateNavigator() {
        variant.style.animation = 'flutter 0.7s infinite alternate, move 10s linear infinite alternate';
        let styleSheet = document.styleSheets[0];

        if (!styleSheet.cssRules || [...styleSheet.cssRules].some(rule => rule.name === 'flutter')) {
          styleSheet.insertRule(`
            @keyframes flutter {
              0% {
                  transform: translateY(0) rotate(0deg);
                  opacity: 0.5;
                  left: 0;
                  top: 50%;
              }
              50% {
                  transform: translateY(-10px) rotate(5deg);
              }
              100% {
                  transform: translateY(0) rotate(-5deg);
                  left: 100%;
                  top: 0;
              }
              `, styleSheet.cssRules.length);
            }
      }
      

      //Setting the background image to the backgrounds array.
      document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;

      const butterflyContainer = document.querySelector('.butterfly-container');
      const orangeButterfly = document.querySelector('.orange-image');
      const blueImage = document.getElementById('blue');
      const yellowImage = document.getElementById('yellow');
      const greenImage = document.getElementById('green');
      const pinkImage = document.getElementById('pink');
      const purpleImage = document.getElementById('purple');
      const silverImage = document.getElementById('silver');
      //Adding event listener for when background changing button is clicked.
    
      backgroundButton.addEventListener('click', () => {
        output.style.display = 'none';
        variantText.style.display = 'none';
        flipContainer.classList.toggle('flipped');
        
        setTimeout(() => {
          currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
          const newBackground = backgrounds[currentBackgroundIndex];
          document.body.style.backgroundImage = newBackground;
          nextPage.style.backgroundImage = backgrounds[currentBackgroundIndex];
          previousPage.style.backgroundImage = backgrounds[currentBackgroundIndex];

          specialButterfly.style.display = 'block';
          document.body.style.backdropFilter = 'brightness(50%) blur(10px)';

          if (currentBackgroundIndex === 1) {
            backgroundButton.style.display = 'none';
            blueImage.style.display = 'block';            
            yellowImage.style.display = 'block';
            greenImage.style.display = 'block';            
            pinkImage.style.display = 'block';
            purpleImage.style.display = 'block';
            silverImage.style.display = 'block';
            dialogueBox.style.display = 'block';

            blueImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              silverImage.style.display = 'none';
              variant.style.filter = 'sepia(1) hue-rotate(180deg) contrast(150%)';
              variantContainer.style.display = 'block';
            });
      
            yellowImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              silverImage.style.display = 'none';
              variant.style.filter = 'sepia(1) hue-rotate(10deg) contrast(150%)';
              variantContainer.style.display = 'block';
            });
      
            greenImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              silverImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              variant.style.filter = 'sepia(1) hue-rotate(90deg) contrast(150%)';
              variantContainer.style.display = 'block';
            });
      
            pinkImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              silverImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              variant.style.filter = 'sepia(1) hue-rotate(300deg) contrast(150%)';
              variantContainer.style.display = 'block';
            });

            purpleImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              silverImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              variant.style.filter = 'sepia(1) hue-rotate(240deg) contrast(150%)';
              variantContainer.style.display = 'block';
            });

            silverImage.addEventListener('click', () => {
              blueImage.style.display = 'none';
              yellowImage.style.display = 'none';
              pinkImage.style.display = 'none';
              greenImage.style.display = 'none';
              purpleImage.style.display = 'none';
              silverImage.style.display = 'none';
              dialogueBox.style.display = 'none';
              variant.style.filter = 'grayscale(100%) contrast(150%)';
              variantContainer.style.display = 'block';
            });
          }

          /*const maze = document.querySelector('.maze');
          const player = document.getElementById('player');
          const playerContainer = document.querySelector('.player-container');*/

          if (currentBackgroundIndex === 2) {
            /*maze.style.display = 'block';
            playerContainer.style.display = 'block';
            backgroundButton.style.display = 'none';*/
            variant.style.display = 'block';
            variant.style.animation = 'none';
            variant.style.animation = 'flutter 0.7s infinite alternate, move 10s linear infinite alternate';

            dialogueBox.style.top = '3%';
            dialogueBox.style.height = '12%';
            dialogueBox.style.display = 'block';
            window.location.href = "https://lexicon-mu.vercel.app/";
          }
          
          let hue = 0;
          
          if (currentBackgroundIndex === 3) {
            function colorChange() {
              hue = (hue + 1) % 360;
              butterflyContainer.style.filter = `hue-rotate(${hue}deg)`;
              requestAnimationFrame(colorChange);
            }
            colorChange();
          } 

          if (currentBackgroundIndex === 4) {
            butterflyContainer.style.filter = 'none';
          }

          updateContent();
          flipper.classList.remove('flipped');
        }, 700);
      }); 



updateContent(); 

      







