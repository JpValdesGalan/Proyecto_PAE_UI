const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.get('', express.static(path.join(__dirname, 'dist', 'proyecto-pae-ui')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'proyecto-pae-ui', 'index.html'));
}); 

app.listen(port, () => {
    console.log('App is running on port: ' + port);
});