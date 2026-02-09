'use client'

import { LinkText } from '@/components/common'

const experiences = [
	{
		title: 'Software Development Engineer 1',
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com/en',
		websiteDisplayName: 'amadeus.com',
		period: {
			start: 'Jul 2023',
			end: 'Aug 2025'
		},
		tech: [
			'Java',
			'Spring Boot',
			'C++',
			'Angular',
			'REST APIs',
			'MySQL',
			'MongoDB',
			'Docker',
			'Azure',
			'Microservices',
			'CI/CD',
			'Application Security (Fortify, Black Duck)'
		]

	},
	{
		title: 'Software Development Engineer Intern',
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com/en',
		websiteDisplayName: 'amadeus.com',
		period: {
			start: 'Jan 2023',
			end: 'Jun 2023'
		},
		tech: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST APIs'],
	},
]

export default function Experience() {
	return (
		<section className="space-y-6 duration-1000 animate-in fade-in fill-mode-both animation-delay-700">
			<h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
				experience.
			</h2>

			<div className="space-y-6">
				{experiences.map((exp, index) => (
					<div
						key={index}
						className="flex flex-col gap-3 rounded-lg"
					>
						<div className="flex flex-wrap items-start justify-between gap-2">
							<div>
								<h3 className="font-normal text-primary">
									{exp.title}
								</h3>
								<div className="flex items-center justify-start gap-1.5 text-sm text-muted-foreground">
									at{" "}
									<LinkText href={exp.companyUrl}>
										{exp.company}
									</LinkText>
								</div>
							</div>
							<p className="text-sm font-normal text-muted-foreground">
								{exp.period.start} - {exp.period.end}
							</p>
						</div>

						{/* Tech Stack */}
						{exp.tech && exp.tech.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{exp.tech.map((tech, techIndex) => (
									<span
										key={techIndex}
										className="text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
									>
										[{tech}]
									</span>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	)
}
