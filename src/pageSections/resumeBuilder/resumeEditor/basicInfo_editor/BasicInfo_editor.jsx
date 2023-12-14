import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
export default function BasicInfo_editor({ data }) {
	const { register} = useForm();

	const [imageUrl, setImageUrl] = useState(null);
	const onChangePictureUpload = (e) => {
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImageUrl(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	return (
		<div className="mt-4">
			<h4 className="grid grid-cols-2">
				<Icon icon="ph:user" />
				<span>Basic Info</span>
			</h4>
			<form>
				<ul>
					<li className="grid grid-cols-[1fr_5fr] gap-2 p-2">
						<label
							htmlFor="picture_upload"
							className="outline outline-2 outline-gray-500 rounded-full overflow-hidden grid place-content-center cursor-pointer w-12 h-12">
							{imageUrl ? (
								<img  src={imageUrl} alt="picture" />
							) : (
								<Icon icon="uil:image-upload" />
							)}
                            <input
                                type="file"
                                name="picture_upload"
                                className="hidden"
                                id="picture_upload"
                                placeholder="picture_upload"
                                {...register("picture_upload")}
                                onChange={onChangePictureUpload}
                            />
						</label>
						<div>
							<label htmlFor="picture_url">picture</label>
							<input
								type="text"
								name="picture_url"
								className="w-full cursor-not-allowed"
								id="picture_url"
								placeholder="https://"
								{...register("picture_url")}
                                disabled
							/>
						</div>
					</li>
					<li>
						<label htmlFor="first_name">first name</label>
						<input
							type="text"
							name="first_name"
							className="w-full"
							id="first_name"
							placeholder="first name"
							{...register("first_name")}
						/>
					</li>
					<li>
						<label htmlFor="headline">Your headline</label>
						<textarea
							className="w-full"
							id="headline"
							placeholder="Write your headline here..."
							{...register("headline")}></textarea>
					</li>
					<li>
						<label htmlFor="phone"></label>
						<input
							type="text"
							name="phone"
							className="w-full"
							id="phone"
							placeholder="phone"
							{...register("phone")}
						/>
					</li>
					<li>
						<label htmlFor="email"></label>
						<input
							type="text"
							name="email"
							className="w-full"
							id="email"
							placeholder="email"
							{...register("email")}
						/>
					</li>
					<li>
						<label htmlFor="location"></label>
						<input
							type="text"
							name="location"
							className="w-full"
							id="location"
							placeholder="location"
							{...register("location")}
						/>
					</li>
				</ul>
                <ul>
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
                </ul>
			</form>
		</div>
	);
}
