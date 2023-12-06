const ResumeDataObject = {
	basic_info: {
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
			aspect_ratio: 1,
			border_radius: 50,
			effects: {
				hidden: false,
				border: false,
				grayscale: false,
			},
		},
	},
	sections: {
		summary: {
			name: "Summary",
			column: 1,
			visible: true,
			id: "summary",
			content: "",
		},
		skills: {
			name: "Skills",
			column: 1,
			visible: true,
			id: "skills",
			items: [
				{
					id: "randomSkill_id_1",
					visible: true,
					name: "HTML",
					description: "",
					level: 0,
					keyword: [],
				},
				{
					id: "randomSkill_id_2",
					visible: true,
					name: "CSS",
					description: "",
					level: 0,
					keyword: [],
				},
			],
		},
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
				break_line: true,
				page_number: true,
			},
		},
	},
};
export default ResumeDataObject;
