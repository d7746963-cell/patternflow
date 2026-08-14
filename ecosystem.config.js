module.exports = {
  apps: [
    {
      name: "PatternFlow-Backend",
      script: "server.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "development",
      },
      watch: false
    },
    {
      name: "PatternFlow-Frontend",
      script: "./node_modules/vite/bin/vite.js",
      cwd: "./frontend",
      env: {
        NODE_ENV: "development",
      },
      watch: false
    }
  ]
};
