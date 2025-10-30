import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all words for autocomplete
    const fetchWords = async () => {
      try {
        const response = await axios.get('/api/words');
        setAllWords(response.data);
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

  const handleSearchSubmit = (e) => {
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
    try {
      const response = await axios.get('/api/words');
      const words = response.data;
      const randomWord = words[Math.floor(Math.random() * words.length)];
      navigate(`/word/${randomWord.wordID}`);
    } catch (error) {
      console.error('Error fetching random word:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Nepali Urban Dictionary</h1>
        </Link>

        <div className="header-search" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="header-search-input"
              placeholder="Search for a word..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
            />
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((word) => (
                <div
                  key={word.wordID}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(word.wordID)}
                >
                  <div className="suggestion-word">{word.wordName}</div>
                  <div className="suggestion-meaning">
                    {word.wordMeaning.substring(0, 60)}
                    {word.wordMeaning.length > 60 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSuggestions && suggestions.length === 0 && searchQuery && (
            <div className="suggestions-dropdown">
              <div className="suggestion-item no-results">
                No words found for "{searchQuery}"
              </div>
            </div>
          )}
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <button onClick={handleRandomWord} className="nav-link random-btn">
            Random Word
          </button>
          <Link to="/submit" className="nav-link submit-btn">Submit Word</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
