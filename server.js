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
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

projectData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize data:", err);
    });


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                res.status(404).send(err);
            });
    } else {
        projectData.getAllProjects()
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                res.status(404).send(err);
            });
    }
});

app.get('/solutions/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    
    projectData.getProjectById(projectId)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});