const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Define a route handler for the root URL (/)
app.get('/', (req, res) => {
    // Call a function to retrieve the IP address
    const ipAddress = getIpAddress();
    // Send the IP address as a response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server IP Address</title>
        </head>
        <body>
            <h1>Server IP Address:</h1>
            <p>${ipAddress}</p>
        </body>
        </html>
    `);
});

// Function to retrieve the IP address of the server
function getIpAddress() {
    // Retrieve network interfaces information from the operating system
    const interfaces = os.networkInterfaces();
    // Iterate through the network interfaces
    for (const interfaceName of Object.keys(interfaces)) {
        // Iterate through the addresses of each network interface
        for (const address of interfaces[interfaceName]) {
            // Check if the address is an IPv4 address and not an internal address
            if (address.family === 'IPv4' && !address.internal) {
                // Return the IPv4 address
                return address.address;
            }
        }
    }
    // Return 'Unknown' if no suitable IP address is found
    return 'Unknown';
}

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
