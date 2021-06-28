module.exports = {
  webpack: (config, { dev }) => {
    // Replace React with Preact only in client production build
    if (!dev) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
      });
    }

    return config;
  },
};
