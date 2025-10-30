import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Word.css';

const Word = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState(null);
  const [allWordIds, setAllWordIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWord();
    fetchAllWordIds();
  }, [id]);

  const fetchWord = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/words/${id}`);
      setWord(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching word:', error);
      setLoading(false);
    }
  };

  const fetchAllWordIds = async () => {
    try {
      const response = await axios.get('/api/words');
      const ids = response.data.map((w) => w.wordID);
      setAllWordIds(ids);
    } catch (error) {
      console.error('Error fetching word IDs:', error);
    }
  };

  const handleRandomWord = async () => {
    try {
      const response = await axios.get('/api/words');
      const words = response.data;
      const randomWord = words[Math.floor(Math.random() * words.length)];
      navigate(`/word/${randomWord.wordID}`);
    } catch (error) {
      console.error('Error fetching random word:', error);
    }
  };

  const handleNextWord = () => {
    const currentIndex = allWordIds.indexOf(parseInt(id));
    if (currentIndex !== -1 && currentIndex < allWordIds.length - 1) {
      navigate(`/word/${allWordIds[currentIndex + 1]}`);
    } else if (allWordIds.length > 0) {
      // Loop back to first word
      navigate(`/word/${allWordIds[0]}`);
    }
  };

  const handlePreviousWord = () => {
    const currentIndex = allWordIds.indexOf(parseInt(id));
    if (currentIndex > 0) {
      navigate(`/word/${allWordIds[currentIndex - 1]}`);
    } else if (allWordIds.length > 0) {
      // Loop to last word
      navigate(`/word/${allWordIds[allWordIds.length - 1]}`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="word-container">
          <div className="loading">Loading word...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!word) {
    return (
      <>
        <Header />
        <div className="word-container">
          <div className="error-message">
            <h2>Word not found</h2>
            <p>The word you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="home-btn">
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="word-container">
        <div className="word-content">
          <div className="word-header">
            <h1 className="word-title">{word.wordName}</h1>
            <div className="word-meta">
              Added: {new Date(word.dateCreated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          <div className="word-section">
            <h3>Meaning</h3>
            <p className="word-meaning">{word.wordMeaning}</p>
          </div>

          <div className="word-section">
            <h3>Example Usage</h3>
            <p className="word-example">{word.wordSentence}</p>
          </div>

          <div className="word-actions">
            <button onClick={handlePreviousWord} className="nav-btn">
              ← Previous Word
            </button>
            <button onClick={handleRandomWord} className="random-word-btn">
              🎲 Random Word
            </button>
            <button onClick={handleNextWord} className="nav-btn">
              Next Word →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Word;
