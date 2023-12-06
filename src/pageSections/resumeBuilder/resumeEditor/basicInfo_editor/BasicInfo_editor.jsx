
export default function BasicInfo_editor ({data}) {
	return(
		<div className="mt-4">
			<h4>Basic Info</h4>
			<ul>
				<li>
					<div>{data?.name}</div>
				</li>
				<li>
					<div>{data?.headline}</div>
				</li>
				<li>
					<div>{data?.phone}</div>
				</li>
				<li>
					<div>{data?.email}</div>
				</li>
				<li>
					<div>{data?.portfolio.label}</div>
					<div>{data?.portfolio.href}</div>
				</li>
				<li>
					<div>{data?.location}</div>
				</li>
				<li>
					<div>{data?.linkedin.label}</div>
					<div>{data?.linkedin.href}</div>
				</li>
				<li>
					<div>{data?.github.label}</div>
					<div>{data?.github.href}</div>
				</li>
				<li>
					<div>{data?.picture.url}</div>
				</li>
			</ul>
		</div>
	)
}
