/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Laba Kunwar Student ID: 162983233 Date: 06/13/2025
*
*  Published URL: 
*
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');

const app = express();
const PORT = process.env.PORT || 3000;




app.use(express.static(path.join(__dirname, 'public')));


app.get('/css/main.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'css', 'main.css'), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});


app.get('/images/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'images', req.params.file));
});


projectData.initialize()
    .then(() => {
        if (process.env.VERCEL !== '1') {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    })
    .catch(err => {
        console.error("Failed to initialize data:", err);
    });


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    
    const dataPromise = sector 
        ? projectData.getProjectsBySector(sector)
        : projectData.getAllProjects();
    
    dataPromise
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ error: err }));
});

app.get('/solutions/projects/:id', (req, res) => {
    projectData.getProjectById(parseInt(req.params.id))
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ error: err }));
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


module.exports = app;