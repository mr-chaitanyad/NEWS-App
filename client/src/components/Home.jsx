import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/home');
      const data = await response.json();
      setNewsList(data);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await fetch(`http://localhost:5000/delete_news/${id}`, { method: 'DELETE' });
        alert('News deleted successfully!');
        fetchNews(); // refresh list
      } catch (err) {
        console.error(err);
        alert('Failed to delete news.');
      }
    }
  };

  const handleUpdate = (news) => {
    alert(`Implement update modal for: ${news.title}`);
    try{
      navigate("/edit_news",{ state: { id: news._id,news } })
    }
    catch(err){
      console.log(err);      
    }
  };

  return (
    <div className="container py-3">
      <h5 className="text-center mb-3 fw-bold text-primary">📰 News Dashboard</h5>
      {loading && <p className="text-center">Loading news...</p>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-2 justify-content-center">
        {newsList.length === 0 && !loading && (
          <p className="text-center text-muted">No news found. Add some news to display here.</p>
        )}
        {newsList.map((news) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={news._id}>
            <div className="card h-100 shadow-sm mx-auto position-relative" style={{ maxWidth: '280px',maxHeight:"300px" }}>
              {/* Three-dot menu */}
              <div className="dropdown position-absolute top-0 end-0 m-1">
                <button
                  className="btn btn-sm btn-light"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ⋮
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleUpdate(news)}
                    >
                      Update
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => handleDelete(news._id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>

              {news.imageUrl && (
                <img
                src={news.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDjVbsavDQzd6ZiKhRMCU7rLgfrL0dH_mfA&s"}
                alt={news.title}
                className="card-img-top"
                style={{ height: '100px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body p-2 d-flex flex-column">
                <h6 className="card-title fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>
                  {news.title}
                </h6>
                <p className="card-text text-muted small flex-grow-1 mb-1" style={{ fontSize: '0.75rem' }}>
                  {news.content.length > 50
                    ? news.content.slice(0, 50) + '...'
                    : news.content}
                </p>
                <p className="text-secondary small mb-1">
                  <strong>Author:</strong> {news.author || 'Unknown'}
                </p>
                <span
                  className={`badge ${
                    news.isPublished ? 'bg-success' : 'bg-secondary'
                  }`}
                  style={{ alignSelf: 'start' }}
                >
                  {news.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="card-footer text-center p-1">
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                  {news.publishedAt
                    ? new Date(news.publishedAt).toLocaleDateString()
                    : 'Not published'}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
