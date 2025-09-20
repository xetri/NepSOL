import './CenterContainer.css';

const CenteredContainer = ({ title, subtitle, children, footer }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        {title && <h2 className="login-title">{title}</h2>}
        {subtitle && <p className="login-subtitle">{subtitle}</p>}

        {children}

        {footer && <div className="login-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default CenteredContainer;
