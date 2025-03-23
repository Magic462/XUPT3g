import './Blogs.scss';

const Blogs = () => {
  return (
    <div className="blogs-container">
      <h1>博客列表</h1>
      <div className="blogs-grid">
        <div className="blog-card">
          <h2>示例博客标题</h2>
          <p>这是一个示例博客内容...</p>
        </div>
        <div className="blog-card">
          <h2>示例博客标题 2</h2>
          <p>这是另一个示例博客内容...</p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
