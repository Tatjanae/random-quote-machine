import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';


function App(){
const [quotes, setQuotes] = React.useState([]);
const [randomQuote, setRandomQuote] = React.useState("");
const [color, setColor] = React.useState("#faf0e6");
const [isHovered, setIsHovered] = React.useState(false);


React.useEffect(() => {
async function fetchData(){
  const response = await fetch("https://type.fit/api/quotes")
  const data = await response.json();

  setQuotes(data);
  let randIndex = Math.floor(Math.random() * data.length);
  setRandomQuote(data[randIndex]);
}
fetchData();
}, [])

const getNewQuote = () => {
  
    const colors = [
      "#ffcaca",
      "#ffedc1",
      "#feffb8",
      "#c4ffcb",
      "#c8e5ff",
    ];
    
  
  let randIndex = Math.floor(Math.random() * quotes.length);
  let randColorIndex = Math.floor(Math.random() * colors.length);
  setRandomQuote(quotes[randIndex]);
  setColor(colors[randColorIndex]);

}

const buttonStyle = {
  borderColor: color,
  backgroundColor: isHovered ? color : "transparent",
};

  return (
<div class="main-container d-flex justify-content-center align-items-center" style={{backgroundColor: color, minHeight: "100vh"}}>

<div className="container mx-auto" id="quote-box">
<div className="card">
<div className="card-header text-center fw-bold" style={{backgroundColor: color}}>Inspirational Quotes</div>
<div className="card-body">
{randomQuote ? (
<>

<p className="card-text text-center" id="text">&quot;{randomQuote.text}&quot;</p>
<h5 className="card-title" id="author">- {randomQuote.author || "No author"}</h5>
</>
) : (<h2>Loading</h2>)}

<div className="buttonrow">
  <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(
    '""' + randomQuote.text + '" ' + randomQuote.author
  )
  } target="_blank" rel='noreferrer' className="btn btn-outline-warning twitter" id="tweet-quote"><FontAwesomeIcon className="social-media" icon={faTwitter} /></a>
  <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(randomQuote.author) + "&content=" + encodeURIComponent(randomQuote.text) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tunblr_share_button"} target="_blank" className="btn btn-outline-danger tumblr" rel='noreferrer'><FontAwesomeIcon className="social-media" icon={faTumblr} /></a>
  <button onClick={getNewQuote} className="new-quote btn btn-outline-primary text-center social-media" id="new-quote" style={buttonStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>New Quote</button>
</div>
</div>
</div>
<footer className="text-center">Made by <a class="credits" href="https://github.com/Tatjanae" target="_blank" rel='noreferrer'>Tatjana Bauer</a></footer>
</div>
</div>
  );
}





export default App;
