
const projects = {
    
    data: [
        { id: 1, title: "Solar Farm", sector: "energy", summary_short: "Renewable energy project", feature_img_url: "/images/solar.jpg" },
        { id: 2, title: "Green Transport", sector: "transport", summary_short: "Eco-friendly vehicles", feature_img_url: "/images/transport.jpg" },
        { id: 3, title: "Urban Garden", sector: "agriculture", summary_short: "City farming initiative", feature_img_url: "/images/garden.jpg" }
    ],

    initialize: function() {
        return Promise.resolve(); 
    },

    getAllProjects: function() {
        return Promise.resolve(this.data);
    },

    getProjectById: function(id) {
        const project = this.data.find(p => p.id === id);
        return project ? Promise.resolve(project) : Promise.reject("Project not found");
    },

    getProjectsBySector: function(sector) {
        const filtered = this.data.filter(p => p.sector === sector);
        return filtered.length ? Promise.resolve(filtered) : Promise.reject("No projects in this sector");
    }
};

module.exports = projects;