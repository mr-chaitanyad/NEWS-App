import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNews = () => {
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    imageUrl: '',
    publishedAt: '',
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/add_news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      alert('News data sent successfully!');
      setNewsData({
        title: '',
        content: '',
        author: '',
        category: '',
        imageUrl: '',
        publishedAt: '',
        isPublished: false,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send news data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-center mb-4 text-primary fw-bold">Add News Data</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={newsData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter news title"
             
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              name="content"
              value={newsData.content}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Enter news content"
              
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={newsData.author}
              onChange={handleChange}
              className="form-control"
              placeholder="Author name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={newsData.category}
              onChange={handleChange}
              className="form-control"
              placeholder="Category"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={newsData.imageUrl}
              onChange={handleChange}
              className="form-control"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Published At</label>
            <input
              type="datetime-local"
              name="publishedAt"
              value={newsData.publishedAt}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              name="isPublished"
              checked={newsData.isPublished}
              onChange={handleChange}
              className="form-check-input"
              id="isPublished"
            />
            <label htmlFor="isPublished" className="form-check-label fw-semibold">
              Published
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send News Data'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
