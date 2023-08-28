import React, { useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);

  const [searchQuery, setSearchQuery] = useState();

  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');

  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }

  const showLoading = () => (loading ? <p>Please wait...</p> : "");

  const showForm = () => (
    <form className='d-flex' style={{marginBottom:"10px"}} onSubmit={handleSubmit}>
      <input className='form-control' placeholder='Type to search news' type="text" value={searchQuery} onChange={handleChange} />
      <button className='btn btn-primary'>Search</button>
    </form>
  );

  const showData = () => (
    news.map((n, i) => (
      <div style={{marginBottom:"10px"}} key={i}>
        <p style={{marginBottom:"0px"}}><a href={n.url}>{n.title}</a></p>
        <span style={{fontSize:"12px"}}>Author Name: {n.author}</span>
      </div>
    ))
  );

  return (
    <div className='container my-5' style={{paddingLeft:"10px"}}>
      <h2>News App</h2>
      {showForm()}
      <div className="border rounded p-3">
        {!loading ? showData() : showLoading()}
      </div>
    </div>
  );
};

// const App = () => {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     document.title = `Clicked ${count} times`; 
//   });
//   const increment = () => {
//     setCount(count + 1);
//   }
//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button className="btn btn-primary" onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };


// class App extends Component {
//   state = {
//     count: 0
//   }
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   };
//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`
//   }
//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`
//   }
//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button className="btn btn-primary" onClick={this.increment}>Clicked {this.state.count} times</button>
//       </div>
//     ) 
//   }
// }

export default App;
