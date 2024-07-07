const AsyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error(`${fn.name.toUpperCase()} ERROR:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      
    });
  };
  
  export default AsyncHandler;