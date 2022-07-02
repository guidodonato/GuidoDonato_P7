import { useState, useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AuthContext, UpdateContext } from '../../utils/context'
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
} from '../../utils/style/Grupomania'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function UploadImagUrl({ imagenUrl, handleUploadimg }) {
    if (imagenUrl) {
        return <UploaderImg src={imagenUrl} alt="gruopomania" />
    } else {
        return (
            <UploadLabel>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span>Upload image</span>
                <BtnUploadImg
                    type="file"
                    accept="image/*"
                    name="imagen"
                    onChange={handleUploadimg}
                />
            </UploadLabel>
        )
    }
}
function Updatepost() {
    const ismobile = useMediaQuery({ maxWidth: 767 })
    const { name, userID, usertoken, islogged } = useContext(AuthContext)
    const { idposts } = useContext(UpdateContext)
    const [postsed, setIsposted] = useState(false)
    const [imagenUrl, setImagenUrl] = useState(null)
    const [file, setFile] = useState()
    const [comments, setComments] = useState()
    const navigate = useNavigate()
    const formdata = new FormData()

    async function handleUploadimg(e) {
        setFile(e.target.files[0])

        console.log({ imagenUrl })
    }
    useEffect(() => {
        if (file) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                setImagenUrl(fileReader.result)
            }
        }
    }, [file])

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(userID, name)
        formdata.append('userId', userID)
        formdata.append('name', name)
        formdata.append('comments', comments)
        formdata.append('imageUrl', file)

        fetchUpdateposts()
    }
    async function fetchUpdateposts() {
        fetch(`http://localhost:4000/api/posts/${idposts}`, {
            method: 'PUT',
            headers: {
                Authorization: `beare ${usertoken}`,
            },
            body: formdata,
        })
            .then((res) => res.json())

            .then((data) => {
                console.log(data)
                setIsposted(true)
            })
            .catch((err) => console.log(err))
        setFile(null)
    }

    useEffect(() => {
        console.log({ imagenUrl })
        if (postsed) {
            setFile(null)
            navigate('/Posts')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postsed, imagenUrl])

    useEffect(() => {
        if (islogged) {
            console.log(islogged)
        } else {
            navigate('/')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [islogged])

    return ismobile ? (
        <MDivUpload>
            <FormUpload onSubmit={handleSubmit}>
                <DivUploadimg>
                    <UploadImagUrl
                        imagenUrl={imagenUrl}
                        handleUploadimg={handleUploadimg}
                        required
                    />
                </DivUploadimg>

                <CommentsText
                    name="comments"
                    required
                    maxLength="35"
                    placeholder="comments"
                    onChange={(e) => setComments(e.target.value)}
                />
                <BtnUpload type="submit" value="Post" />
            </FormUpload>
        </MDivUpload>
    ) : (
        <DivUpload>
            <FormUpload onSubmit={handleSubmit}>
                <DivUploadimg>
                    <UploadImagUrl
                        imagenUrl={imagenUrl}
                        handleUploadimg={handleUploadimg}
                        required
                    />
                </DivUploadimg>

                <CommentsText
                    name="comments"
                    required
                    maxLength="35"
                    placeholder="comments"
                    onChange={(e) => setComments(e.target.value)}
                />
                <BtnUpload type="submit" value="Post" />
            </FormUpload>
        </DivUpload>
    )
}
export default Updatepost
