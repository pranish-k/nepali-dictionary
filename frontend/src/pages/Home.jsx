import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [floatingWords, setFloatingWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch words for floating animation and autocomplete
    const fetchWords = async () => {
      try {
        const response = await axios.get('/api/words');
        const words = response.data;
        setAllWords(words);

        // Select random words and assign random positions for floating
        const randomWords = words
          .sort(() => 0.5 - Math.random())
          .slice(0, 20)
          .map((word) => ({
            id: word.wordID,
            text: word.wordName,
            left: Math.random() * 90 + '%',
            top: Math.random() * 80 + 10 + '%',
            delay: Math.random() * 5,
            duration: 15 + Math.random() * 10,
            fontSize: 1 + Math.random() * 1.5 + 'rem',
          }));

        setFloatingWords(randomWords);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter words based on search query
    if (searchQuery.trim().length > 0) {
      const filtered = allWords
        .filter(
          (word) =>
            word.wordName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            word.wordMeaning.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allWords]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && suggestions.length > 0) {
      // Navigate to first suggestion
      navigate(`/word/${suggestions[0].wordID}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (wordID) => {
    navigate(`/word/${wordID}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleRandomWord = async () => {
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    if (randomWord) {
      navigate(`/word/${randomWord.wordID}`);
    }
  };

  return (
    <div className="home-container">
      <div className="floating-words">
        {floatingWords.map((word) => (
          <span
            key={word.id}
            className="floating-word"
            style={{
              left: word.left,
              top: word.top,
              animationDelay: `${word.delay}s`,
              animationDuration: `${word.duration}s`,
              fontSize: word.fontSize,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      <div className="home-content">
        <h1 className="main-title">Nepali Urban Dictionary</h1>
        <p className="subtitle">Discover the meaning of Nepali slang and urban words</p>

        <div className="search-container-wrapper" ref={searchRef}>
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a word..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              autoFocus
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="home-suggestions-dropdown">
              {suggestions.map((word) => (
                <div
                  key={word.wordID}
                  className="home-suggestion-item"
                  onClick={() => handleSuggestionClick(word.wordID)}
                >
                  <div className="home-suggestion-word">{word.wordName}</div>
                  <div className="home-suggestion-meaning">
                    {word.wordMeaning.substring(0, 60)}
                    {word.wordMeaning.length > 60 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSuggestions && suggestions.length === 0 && searchQuery && (
            <div className="home-suggestions-dropdown">
              <div className="home-suggestion-item no-results">
                No words found for "{searchQuery}"
              </div>
            </div>
          )}
        </div>

        <div className="quick-links">
          <button onClick={handleRandomWord} className="quick-link-btn random">
            🎲 Learn a Random Word
          </button>
          <button onClick={() => navigate('/submit')} className="quick-link-btn submit">
            Submit a Word
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
