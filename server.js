
/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Laba Kunwar Student ID: 162983233 Date: 07/04/2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/css/main.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'css', 'main.css'), {
        headers: { 'Content-Type': 'text/css' }
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
    res.render("home", { page: "/" });
});


app.get('/about', (req, res) => {
    res.render("about", { page: "/about" });
});


app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;

    const dataPromise = sector
        ? projectData.getProjectsBySector(sector)
        : projectData.getAllProjects();

    dataPromise
        .then(projects => {
            if (projects.length === 0) {
                res.status(404).render("404", {
                    message: `No projects found for sector: ${sector}`,
                    page: ""
                });
            } else {
                res.render("projects", {
                    projects,
                    page: "/solutions/projects"
                });
            }
        })
        .catch(err => {
            res.status(404).render("404", {
                message: "Something went wrong while fetching projects",
                page: ""
            });
        });
});


app.get('/solutions/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);

    projectData.getProjectById(id)
        .then(project => {
            res.render("project", { project, page: "" });
        })
        .catch(err => {
            res.status(404).render("404", {
                message: "Project not found",
                page: ""
            });
        });
});


app.use((req, res) => {
    res.status(404).render("404", {
        message: "Page not found",
        page: ""
    });
});

module.exports = app;
