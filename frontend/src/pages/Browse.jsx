import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Browse.css';

const Browse = () => {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    filterWords(query);
  }, [searchParams, words]);

  const fetchWords = async () => {
    try {
      const response = await axios.get('/api/words');
      setWords(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching words:', error);
      setLoading(false);
    }
  };

  const filterWords = (query) => {
    if (!query.trim()) {
      setFilteredWords(words);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = words.filter(
      (word) =>
        word.wordName.toLowerCase().includes(lowercaseQuery) ||
        word.wordMeaning.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredWords(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="browse-container">
          <div className="loading">Loading words...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="browse-container">
        <div className="browse-header">
          <h1>Browse Dictionary</h1>
          <form onSubmit={handleSearch} className="browse-search">
            <input
              type="text"
              className="browse-search-input"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="browse-search-btn">
              Search
            </button>
          </form>
          <p className="word-count">
            {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="words-grid">
          {filteredWords.length > 0 ? (
            filteredWords.map((word) => (
              <div key={word.wordID} className="word-card">
                <h3 className="word-name">{word.wordName}</h3>
                <p className="word-meaning">
                  <strong>Meaning:</strong> {word.wordMeaning}
                </p>
                <p className="word-example">
                  <em>Example:</em> {word.wordSentence}
                </p>
                <p className="word-date">
                  Added: {new Date(word.dateCreated).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No words found matching "{searchQuery}"</p>
              <p className="no-results-hint">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
