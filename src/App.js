import './App.css'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import './index.css';
import axios from 'axios';
import { useState } from 'react';


function App() {

	const[quote, setQuote] = useState("Sustaining true friendship is a lot more challenging than we give it credit for.");
	const [author, setAuthor] = useState("Wayne Gretzky")

	const randomQuote = () => {
		axios.get("https://api.quotable.io/random")
		.then(response => {
			setQuote(response.data.content)
			setAuthor(response.data.author)
		}).catch(error => {
			console.log(error)
		})
		console.log(randomQuote)
	}
	

	const textToSpeech  = () => {
		let utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
		speechSynthesis.speak(utterance)
	}

	const copyQuote = () => {
		navigator.clipboard.writeText(`${quote} by ${author}`);
	}

	const postTweet = () => {
		let tweetUrl = `https://twitter.com/intent/tweet?url=${quote} - ${author}`;
		window.open(tweetUrl, "_blank");
	}



  return (
    <div className="App">

		<div className="wrapper">
			<header>Quote of the Day</header>
			<div className="content">
				<div className="quote-area">
					<FaQuoteLeft className='left-quote'/>
					{quote && <p className='quote'>{quote}</p>}
					<FaQuoteRight className='right-quote'/>
				</div>
				<div className="author">
					<span>__</span>
					<span className="name">{author}</span>
				</div>
			</div>

			<div className="button">
				<div className="features">
					<ul>
						<FaVolumeUp onClick={textToSpeech} className='features-list'/>
						<FaCopy onClick={copyQuote} className='features-list'/>
						<FaTwitter onClick={postTweet} className='features-list'/>
					</ul>
					<button onClick={randomQuote}>New Quote</button>
				</div>
			</div>

		</div>

    </div>
  );
}

export default App;
