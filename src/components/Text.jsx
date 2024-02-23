const Text = ({ h1, h2, h3, h4, h5, h6, className, children }) => {
  const sizes = [h1, h2, h3, h4, h5, h6];
  const styles = [
    'text-9xl',
    'text-8xl',
    'text-6xl',
    'text-4xl leading-snug',
    'text-2xl leading-snug',
    'text-xl'
  ];
  const textClassName =
    sizes.map((size, index) => (size ? styles[index] : null)).find(Boolean) || '';

  return <p className={`${textClassName} ${className}`}>{children}</p>;
};

export default Text;
