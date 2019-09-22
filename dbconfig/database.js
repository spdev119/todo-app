var dbConfig = {
  server: "movierepo.database.windows.net", // Use your SQL server name
  database: "moviedb", // Database to connect to
  user: "we2learn@movierepo", // Use your username
  password: "Azure@2019", // Use your password
  port: 1433,
  // Since we're on Windows Azure, we need to set the following options
  options: {
    encrypt: true
  }
};

module.exports = dbConfig;
