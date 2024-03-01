const Text = ({ h1, h2, h3, h4, h5, className, children, ...rest }) => {
  const sizes = [h1, h2, h3, h4, h5];
  const styles = [
    'text-5xl md:text-6xl',
    'text-4xl md:text-5xl',
    'text-2xl md:text-3xl',
    'text-xl md:text-2xl',
    'text-lg md:text-xl'
  ];
  const textClassName =
    sizes.map((size, index) => (size ? styles[index] : null)).find(Boolean) || '';

  return (
    <p className={`${textClassName} ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default Text;
