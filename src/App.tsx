import { useState, useEffect } from 'react';
import { Gift, Heart, Star, Sparkles, Music, Volume2, VolumeX, Camera, MapPin, Clock } from 'lucide-react';
import videoFile from './image/video1.mp4';
import birthdaySong from './image/happy-birthday.mp3';

import first from './image/1.jpeg';
import second from './image/2.jpeg';
import three from './image/3.jpeg';
import four from './image/4.jpeg';
import five from './image/5.jpeg';
import six from './image/6.jpeg';
import seven from './image/7.jpeg';

import './animations.css';

function App() {
  const [typedText, setTypedText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [candlesLit, setCandlesLit] = useState(false);
  const [timeUntilBirthday, setTimeUntilBirthday] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);

  const fullMessage = "Happy Birthday Rohit 🎉";
  const heartfeltMessages = [
    "No matter how many miles stretch between us today,know that my wishes are flying over every mountain, river, and city just to reach you.",
    "Distance may keep us apart, but it can’t stop me from celebrating you — your kindness, your laughter, and the way you brighten lives even from thousands of miles away.",
    "So here’s to you, my faraway but never-forgotten friend — may this year bring you joy that travels faster than light, and may our paths cross again soon for the loudest, happiest celebration ever.  🎂✨"
  ];

  const memoryImages = [
    {
      url: first,
      
    },
    {
      url: second,
 
    },
    {
      url: three,
    
    },
    {
      url: four,
     
    },  
        {
      url: six,
      
    },
        {
      url: seven,
   
    }
  ];

  useEffect(() => {
  const audio = new Audio(birthdaySong);
  audio.loop = true;
  audio.volume = 0.5;

  audio.play().catch(() => {
    // Autoplay blocked, wait for user interaction
    const playOnClick = () => {
      audio.play();
      document.removeEventListener('click', playOnClick);
    };
    document.addEventListener('click', playOnClick);
  });

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, []);

  // Birthday countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 11, 25); // December 25th
      
      if (birthday < now) {
        birthday = new Date(currentYear + 1, 11, 25);
      }
      
      const timeDiff = birthday.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days === 0 && hours === 0 && minutes === 0) {
        setTimeUntilBirthday("🎉 IT'S YOUR BIRTHDAY! 🎉");
        setShowFireworks(true);
      } else if (days === 0) {
        setTimeUntilBirthday(`${hours}h ${minutes}m until your special day!`);
      } else {
        setTimeUntilBirthday(`${days} days until your birthday!`);
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullMessage.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullMessage.slice(0, typedText.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Show heartfelt message after typing completes
  useEffect(() => {
    if (typedText === fullMessage) {
      setTimeout(() => setShowMessage(true), 1000);
    }
  }, [typedText]);

  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % memoryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Light candles after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setCandlesLit(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const createConfetti = () => {
    return Array.from({ length: 80 }, (_, i) => (
      <div
        key={i}
        className={`confetti confetti-${i % 8} ${showFireworks ? 'firework-burst' : ''}`}
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${4 + Math.random() * 3}s`,
          transform: `rotate(${Math.random() * 360}deg)`
        }}
      />
    ));
  };

  const createStars = () => {
    return Array.from({ length: 150 }, (_, i) => (
      <div
        key={i}
        className="star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          opacity: Math.random() * 0.8 + 0.2
        }}
      />
    ));
  };

  const createBalloons = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        className={`balloon balloon-${i % 6}`}
        style={{
          left: `${5 + i * 8}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }}
      />
    ));
  };

  const createFireworks = () => {
    if (!showFireworks) return null;
    
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="firework"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {createConfetti()}
        {createStars()}
        {createBalloons()}
        {createFireworks()}
      </div>

      {/* Countdown Timer */}
      {/* <div className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-yellow-300" />
          <span className="text-white/90 font-dancing text-sm">{timeUntilBirthday}</span>
        </div>
      </div> */}

      {/* Music toggle */}
      {/* <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
      >
        {musicPlaying ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
      </button> */}

      {/* Intro Section with Text and Video */}

<section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
  {/* Left Text Block */}
  <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-10">
    <h2 className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 mb-6 leading-none" style={{ lineHeight: "66px", fontSize: "38px", marginBottom: 0 }}>
      To Many More Smiles & Success
    </h2>
    <p className="text-xl text-white/90 font-dancing leading-relaxed">
     Since I can’t knock on your door and surprise you with cake,
I’m sending you this wish in full HD,
with 100% love, 0% calories, and unlimited data! 📡💖
You’re more than a friend — you’re the Wi-Fi to my internet, the cheese to my pizza, and the reason my cheeks hurt from laughing.
 💖
    </p>
  </div>

  {/* Right Video Block */}
  <div className="md:w-1/2 w-full">
    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black">
      <video
        src={videoFile} 
        autoPlay
        muted
        loop
        className="w-full h-full object-cover" style={{ height: 900, objectPosition: 'top' }}
      />
    </div>
  </div>
</section>


      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 mb-6 mt-12 typing-cursor drop-shadow-lg" style={{ lineHeight: "130px" }}>
              {typedText}
            </h1>
            
            {showMessage && (
              <div className="mt-12 fade-in">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
                  <p className="text-xl md:text-2xl text-white/95 font-dancing font-medium mb-6 leading-relaxed">
                    You came into my life so surprisingly, yet turned out to be the most beautiful part of it. Wishing you a very Happy Birthday!” ❤
                  </p>
                  <div className="flex justify-center space-x-6 mb-6">
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                    <Heart className="w-8 h-8 text-pink-300 animate-bounce" />
                    <Star className="w-8 h-8 text-blue-300 animate-pulse" />
                  </div>
                </div>
                <button
                  onClick={() => document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg border border-white/20"
                >
                  Click Here Rohit ✨
                </button>
              </div>
            )}
          </div>
        </div>
      </section>


<section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
  <div className="container flex flex-col md:flex-row items-center max-w-4xl mx-auto">
    
    {/* Right Video Block */}
    <div className="md:w-1/2 w-full mb-10 md:mb-0">
      <div className="rounded-3xl overflow-hidden shadow-2xl border-white/20">
   <img src={seven} alt=""  style={{height: "480px"}}/>
      </div>
    </div>

    {/* Left Text Block */}
    <div className="md:w-1/2 text-center md:text-left md:pl-10">
      <h2
        className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 mb-6 leading-none"
        style={{ lineHeight: "41px", fontSize: "21px" }}
      >File Name: HappyBirthday.js <br/>
Status: Busy Engineer Detected <br/>
Update: Tum hamesha apne code, bugs, aur deadlines me ghuse rehte ho…

      </h2>
      <p className="text-xl text-white/90 font-dancing leading-relaxed">
        Din bhar tum functions, loops aur deadlines ke chakkar me ghoomte rehte ho…aur main yaha sochti hoon ki kaash tum apne heart ka firewall thoda mere liye open kar do. ❤️ <br/>
 Tumhare messages mere liye API calls jaise hain — rare hote hain, aur kabhi kabhi toh ‘server not responding’ error bhi aa jaata hai… <br/>
par jab aate hain na, pura mood cache clear ho jaata hai aur system fresh run karne lagta hai. 💖
      </p>
    </div>

  </div>
</section>



      {/* Personal Stats Section */}
      {/* <section className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl mb-2">🎂</div>
              <div className="text-2xl font-bold text-white mb-1">25</div>
              <div className="text-white/70 font-dancing">Years of Awesome</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-2xl font-bold text-white mb-1">∞</div>
              <div className="text-white/70 font-dancing">Smiles Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl mb-2">💝</div>
              <div className="text-2xl font-bold text-white mb-1">365</div>
              <div className="text-white/70 font-dancing">Days to Celebrate You</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Memories Section */}
      <section id="memories" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 mb-6" style={{lineHeight: "85px"}}>
            You Look Elegant 📸
          </h2>
          <p className="text-xl text-white/85 font-dancing mb-12 max-w-2xl mx-auto">
            Every adventure, every laugh, every milestone - these moments tell the beautiful story of who you are
          </p>
          
          <div className="relative" style={{maxWidth: "600px", margin: "0 auto"}}>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-500">
              <img
                src={memoryImages[currentImageIndex].url}
                alt={`Memory ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-1000" style={{ objectPosition: 'top', height: '950px' }}

              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="text-left">
                    <h3 className="font-dancing text-xl mb-1">{memoryImages[currentImageIndex].caption}</h3>
                 
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-3">
              {memoryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/60 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Cake Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 mb-12">Make a Wish! 🕯️</h2>
          
          <div className="relative inline-block" style={{marginTop: "100px"}}>
            <div className="birthday-cake">
              {/* Cake base */}
              <div className="cake-base bg-gradient-to-b from-yellow-200 via-pink-300 to-pink-500 w-80 h-40 rounded-2xl mx-auto relative shadow-2xl border-4 border-white/20">
                <div className="cake-layer bg-gradient-to-b from-purple-200 via-purple-400 to-purple-600 w-72 h-10 rounded-xl absolute -top-5 left-4 border-2 border-white/30"></div>
                <div className="cake-layer bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 w-64 h-8 rounded-lg absolute -top-12 left-8 border-2 border-white/30"></div>
                
                {/* Candles */}
                <div className="flex justify-center space-x-6 absolute -top-20 left-1/2 transform -translate-x-1/2">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="candle relative">
                      <div className="w-3 h-12 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-t-sm shadow-md border border-yellow-400"></div>
                      <div className={`flame ${candlesLit ? 'lit' : ''}`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                    </div>
                  ))}
                </div>
                
                {/* Decorations */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4">
                  <div className="text-3xl">🌹</div>
                  <div className="text-4xl">🎂</div>
                  <div className="text-3xl">🌹</div>
                </div>
                
                {/* Cake sparkles */}
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-xl text-white/90 font-dancing mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block border border-white/20">
              {candlesLit ? "🌟 Close your eyes, make a wish, and blow out the candles! Your dreams are waiting to come true! ✨" : "✨ Lighting the candles for your special moment..."}
            </p>
          </div>
        </div>
      </section>

      {/* Heartfelt Message Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-red-200 mb-12">From the Heart 💖</h2>
          
          <div className="space-y-8 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {heartfeltMessages.map((message, index) => (
              <p
                key={index}
                className={`text-xl md:text-2xl text-white/95 font-dancing font-medium animate-message animate-delay-${index} leading-relaxed`}
              >
                {message}
              </p>
            ))}
             <div className="text-right text-white/80 font-dancing text-lg">
                  With all my Heart,<br/>
                  <span className="text-yellow-300">Your Neelam 💖</span>
                </div>
          </div>
          
        </div>
      </section>

      {/* Interactive Gift Box */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-blue-200 mb-12">Special Surprise! 🎁</h2>
          
          <div className="flex justify-center">
            <button
              onClick={() => setGiftOpened(!giftOpened)}
              className={`gift-box ${giftOpened ? 'opened' : ''} transition-all duration-700 transform hover:scale-110 hover:rotate-2`}
            >
              <div className="gift-wrapper bg-gradient-to-b from-red-400 via-red-500 to-red-700 w-40 h-40 rounded-2xl shadow-2xl relative cursor-pointer border-4 border-red-300">
                <div className="ribbon-horizontal bg-gradient-to-r from-yellow-300 to-yellow-500 w-full h-6 absolute top-1/2 transform -translate-y-1/2 shadow-md"></div>
                <div className="ribbon-vertical bg-gradient-to-b from-yellow-300 to-yellow-500 w-6 h-full absolute left-1/2 transform -translate-x-1/2 shadow-md"></div>
                <div className="bow bg-gradient-to-b from-yellow-400 to-yellow-600 w-12 h-8 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 shadow-lg border-2 border-yellow-300"></div>
                <div className="bow-center bg-yellow-300 w-4 h-4 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                
                <Gift className="w-20 h-20 text-white/90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
                
                {/* Gift sparkles */}
                {!giftOpened && Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
          
          {giftOpened && (
            <div className="mt-12 fade-in">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 rounded-3xl p-10 mx-auto max-w-3xl shadow-2xl">
                <h3 className="text-4xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 mb-6">Family affection  ✨</h3>
                <img src={five} alt="" />
                <div className="bg-white/10 p-6 mb-6" style={{borderRadius: "16px 16px 0 0s"}}>
                  <p className="text-lg md:text-xl text-white/95 font-dancing leading-relaxed mb-4">
                   Tumhari  family ek pyaara sa group chat hai — mummy ki care notifications, papa ka security firewall, bhai-bhabhi  ki non-stop memes aur masti… aur sabke beech woh unconditional love jo hamesha online rehta hai. Har din lagta hai tum  duniya ke sabse lucky human ho, kyunki tumhae paas ek itna caring aur pyara parivaar hai jo har pal life ko special banata hai.
                  </p>
                </div>
               
                <div className="mt-8 flex justify-center space-x-6">
                  <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  <Star className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
              </div>
            </div>
          )}
          
          <p className="text-white/80 mt-8 font-dancing text-lg bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block border border-white/20">
            {!giftOpened ? "✨ Click the magical gift box to reveal your heartfelt surprise! ✨" : "🥰 Hope this personal message made your birthday even more magical! 🥰"}
          </p>
        </div>
      </section>

      {/* Final celebration */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-8 drop-shadow-lg" >
            🎉 Celebrate YOU! 🎉
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-12 border border-white/20">
            <p className="text-2xl md:text-3xl text-white/95 font-dancing font-medium mb-6 leading-relaxed">
              Today and every day, you deserve all the happiness, love, and magic in the world!
            </p>
            <p className="text-lg text-white/85 font-dancing">
              Thank you for being the incredible person you are. The world is brighter because you're in it! ✨
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-5xl mb-12">
            <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer">🎂</span>
            <span className="animate-pulse hover:scale-125 transition-transform cursor-pointer">🎈</span>
            <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.1s' }}>🎉</span>
            <span className="animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>🎊</span>
            <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.3s' }}>🌟</span>
            <span className="animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.4s' }}>💖</span>
            <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.5s' }}>🎁</span>
            <span className="animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.6s' }}>🥳</span>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg border border-white/20 mr-4"
            >
              Celebrate Again! 🎊
            </button>
           
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-white/70 font-dancing text-lg mb-2">
              Made with 💖 for an extraordinary person
            </p>         
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;