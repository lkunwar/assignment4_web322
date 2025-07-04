const projects = {
    data: [
        {
            id: 1,
            title: "Solar Farm",
            sector: "energy",
            summary_short: "Renewable energy project",
            feature_img_url: "/images/hello.jpg",
            intro_short: "Solar farms are large-scale installations where solar panels are used to harness sunlight and convert it into electricity. These systems contribute to sustainable energy production and reduce dependence on fossil fuels.",
            impact: "Solar farms reduce greenhouse gas emissions, provide clean energy to the grid, and help combat climate change by displacing carbon-intensive energy sources.",
            original_source_url: "https://www.energy.gov/eere/solar/solar-energy"
        },
        {
            id: 2,
            title: "Green Transport",
            sector: "transport",
            summary_short: "Eco-friendly vehicles",
            feature_img_url: "/images/green.jpg",
            intro_short: "Green transport includes electric vehicles, cycling infrastructure, and public transit systems that minimize carbon emissions.",
            impact: "Encouraging green transport reduces traffic congestion and urban air pollution, promoting healthier and more livable cities.",
            original_source_url: "https://www.transportation.gov/sustainability"
        },
        {
            id: 3,
            title: "Urban Garden",
            sector: "agriculture",
            summary_short: "City farming initiative",
            feature_img_url: "/images/urban.jpg",
            intro_short: "Urban gardens utilize rooftops and vacant land in cities to grow food locally, reducing transportation emissions and improving food access.",
            impact: "These projects foster community engagement, provide educational opportunities, and improve urban biodiversity.",
            original_source_url: "https://www.nifa.usda.gov/grants/programs/urban-agriculture"
        }
    ],

    initialize: function () {
        return Promise.resolve();
    },

    getAllProjects: function () {
        return Promise.resolve(this.data);
    },

    getProjectById: function (id) {
        const project = this.data.find(p => p.id === id);
        return project ? Promise.resolve(project) : Promise.reject("Project not found");
    },

    getProjectsBySector: function (sector) {
        const filtered = this.data.filter(p => p.sector === sector);
        return filtered.length ? Promise.resolve(filtered) : Promise.reject("No projects in this sector");
    }
};

module.exports = projects;
