const express = require('express');
const { exec } = require('child_process');
const path = require('path'); // Import the path module
const app = express();
const port = 8080;

app.use(express.static('.')); // Serves files from the current directory

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.js'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

function fetchTemperatures(callback) {
  const basePath = process.pkg ? process.cwd() : __dirname;
  const scriptPath = path.join(basePath, 'getTemp.ps1');
  callback(null, { cpu: 60, gpu: 42 });
  return;
  exec(`powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          callback("Error fetching temperatures", null);
          return;
      }
      console.log(`PowerShell Script Output: ${stdout}`);
      // Process the stdout to extract CPU and GPU temperatures
      let data = JSON.parse(stdout);
      callback(null, { cpu: data.cpu, gpu: data.gpu });
  });
}

app.get('/temperatures', (req, res) => {
  fetchTemperatures((err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to fetch temperatures" });
      }
      res.json(data);
  });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

let pollingInterval = 2000; // 2 seconds
function pollTemperatures() {
    fetchTemperatures((err, data) => {
        if (!err) {
            console.log(`Fetched Temperatures: ${data}`);
            console.log(`Current working directory: ${process.cwd()}`);

        }
        setTimeout(pollTemperatures, pollingInterval);
    });
}

pollTemperatures();
