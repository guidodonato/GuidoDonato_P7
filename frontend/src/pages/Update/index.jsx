/** @format */

import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { AuthContext, UpdateContext } from "../../utils/context";
import {
	DivUpload,
	DivUploadimg,
	CommentsText,
	BtnUpload,
	FormUpload,
	BtnUploadImg,
	MDivUpload,
	UploadLabel,
	UploaderImg,
	UpdateloaderImg,
} from "../../utils/style/Grupomania";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function UploadImagUrl({ imagenUrl, handleUploadimg }) {
	if (!imagenUrl) {
		return <UploaderImg src={imagenUrl} alt='gruopomania' />;
	} else {
		return (
			<div>
				<UploadLabel>
					<FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
					<span>Upload image</span>
					<BtnUploadImg
						type='file'
						accept='image/*'
						name='imagen'
						onChange={handleUploadimg}
					/>
				</UploadLabel>
				<UpdateloaderImg src={imagenUrl} alt='gruopomania' />
			</div>
		);
	}
}

function Updatepost() {
	const ismobile = useMediaQuery({ maxWidth: 767 });
	const { name, userID, usertoken, islogged } = useContext(AuthContext);
	const { idposts } = useContext(UpdateContext);
	const [postsed, setIsposted] = useState(false);
	const [allpost, setAllpost] = useState({});
	const [imagenUrl, setImagenUrl] = useState(null);
	const [file, setFile] = useState();
	const [comments, setComments] = useState();
	const navigate = useNavigate();
	const formdata = new FormData();
	useEffect(() => {
		document.title = "Update-post";
		fetchonepots();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleUploadimg(e) {
		setFile(e.target.files[0]);

		console.log({ imagenUrl });
	}

	useEffect(() => {
		if (file) {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setImagenUrl(fileReader.result);
			};
		}
	}, [file]);

	async function handleSubmit(e) {
		e.preventDefault();

		console.log(userID, name);
		if (allpost.comments !== comments) {
			formdata.append("comments", comments);
		} else {
			formdata.append("comments", allpost.comments);
		}
		if (allpost.imageUrl !== imagenUrl) {
			formdata.append("imageUrl", file);
		} else {
			formdata.append("imageUrl", allpost.imageUrl);
		}

		fetchUpdateposts();
	}
	async function fetchonepots() {
		fetch(`http://localhost:4000/api/posts/${idposts}`, {
			headers: {
				Authorization: `bearer ${usertoken}`,
			},
		})
			.then((res) => res.json())

			.then((data) => {
				console.log(data);
				setAllpost(data);
				setImagenUrl(data.imageUrl);
			})
			.catch((err) => console.log(err));
	}

	async function fetchUpdateposts() {
		fetch(`http://localhost:4000/api/posts/${idposts}`, {
			method: "PUT",
			headers: {
				Authorization: `bearer ${usertoken}`,
			},
			body: formdata,
		})
			.then((res) => res.json())

			.then((data) => {
				console.log(data);
				setIsposted(true);
			})
			.catch((err) => console.log(err));
		setFile(null);
	}

	useEffect(() => {
		if (postsed) {
			setFile(null);
			navigate("/Posts");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postsed]);

	useEffect(() => {
		if (islogged) {
			console.log(islogged);
		} else {
			navigate("/");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [islogged]);

	return ismobile ? (
		<MDivUpload>
			<FormUpload onSubmit={handleSubmit}>
				<DivUploadimg>
					<UploadImagUrl
						imageUrl={allpost.imageUrl}
						handleUploadimg={handleUploadimg}
					/>
				</DivUploadimg>

				<CommentsText
					name='comments'
					required
					maxLength='35'
					placeholder={allpost.comments}
					onChange={(e) => setComments(e.target.value)}
				/>
				<BtnUpload type='submit' value='Post' />
			</FormUpload>
		</MDivUpload>
	) : (
		<DivUpload>
			<FormUpload onSubmit={handleSubmit}>
				<DivUploadimg>
					<UploadImagUrl
						imagenUrl={imagenUrl}
						handleUploadimg={handleUploadimg}
					/>
				</DivUploadimg>

				<CommentsText
					name='comments'
					required
					maxLength='35'
					placeholder={allpost.comments}
					onChange={(e) => setComments(e.target.value)}
				/>
				<BtnUpload type='submit' value='Post' />
			</FormUpload>
		</DivUpload>
	);
}
export default Updatepost;
