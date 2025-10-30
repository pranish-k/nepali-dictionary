import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Submit.css';

const Submit = () => {
  const [formData, setFormData] = useState({
    wordName: '',
    wordMeaning: '',
    wordSentence: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('/api/words', {
        ...formData,
        status: 'pending', // For admin approval
      });

      setMessage({
        type: 'success',
        text: 'Word submitted successfully! It will be reviewed by our team.',
      });

      // Clear form
      setFormData({
        wordName: '',
        wordMeaning: '',
        wordSentence: '',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/browse');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit word. Please try again.',
      });
      console.error('Error submitting word:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="submit-container">
        <div className="submit-content">
          <h1>Submit a Word</h1>
          <p className="submit-description">
            Help us grow the Nepali Urban Dictionary by submitting new words and their meanings.
            Your submission will be reviewed before publishing.
          </p>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label htmlFor="wordName">Word / Phrase *</label>
              <input
                type="text"
                id="wordName"
                name="wordName"
                value={formData.wordName}
                onChange={handleChange}
                placeholder="Enter the Nepali word or phrase"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wordMeaning">Meaning / Definition *</label>
              <textarea
                id="wordMeaning"
                name="wordMeaning"
                value={formData.wordMeaning}
                onChange={handleChange}
                placeholder="Explain what this word means"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wordSentence">Example Usage *</label>
              <textarea
                id="wordSentence"
                name="wordSentence"
                value={formData.wordSentence}
                onChange={handleChange}
                placeholder="Provide an example sentence using this word"
                rows="3"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Word'}
            </button>
          </form>

          <div className="guidelines">
            <h3>Submission Guidelines</h3>
            <ul>
              <li>Make sure the word is commonly used in Nepali urban/slang context</li>
              <li>Provide clear and accurate meanings</li>
              <li>Use appropriate language and examples</li>
              <li>Avoid duplicate submissions</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Submit;
