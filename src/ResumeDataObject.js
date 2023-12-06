const ResumeDataObject = {
	basic: {
		name: "Harsh",
		headline: "Software Engineer",
		phone: "9876543210",
		email: "username@example.com",
		location: "home ,city, state, country",
		portfolio: {
			label: "Portfolio Website",
			href: "https://portfolio.com/",
		},
		linkedin: {
			label: "LinkedIn Profile",
			href: "https://www.linkedin.com/in/username/",
		},
		github: {
			label: "GitHub Profile",
			href: "https://github.com/username",
		},
		picture: {
			url: "https://example.com/profile-picture.jpg",
			size: 64,
			aspectRatio: 1,
			borderRadius: 50,
			effects: {
				hidden: false,
				border: false,
				grayscale: false,
			},
		},
	},
	sections: {
		summary: {},
		skills: {},
		education: {},
		experience: {},
		projects: {},
		certifications: {},
		languages: {},
		interests: {},
		declaration: {},
		custom: {},
		// Add more sections as needed
	},
	meta: {
		page: {
			margin: 16,
			formate: "a4",
			options: {
				breakLine: true,
				pageNumber: true,
			},
		},
	},
};
export default ResumeDataObject;
