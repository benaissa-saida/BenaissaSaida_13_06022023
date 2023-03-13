function FeatureCard({ img, alt, title, desc }) {
  return (
    <div className="feature-item">
      <img src={img} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureCard;
