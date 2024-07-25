import { useRef, useState } from 'react';
import classes from './new-adventure-form.module.css';

export default function NewAdventureForm({ onAddAdventure }) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();
    const [error, setError] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    async function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const fileImage = imageInputRef.current.files[0];

        let isValid = true;
        let imgUrl;

        if (!enteredTitle) {
            setError(state => ({ ...state, title: 'Title is required!' }));
            isValid = false;
        }

        if (!enteredAddress) {
            setError(state => ({ ...state, address: 'Address is required!' }));
            isValid = false;
        }

        if (!enteredDescription) {
            setError(state => ({ ...state, description: 'Description is required!' }));
            isValid = false;
        }

        if (!fileImage) {
            setError(state => ({ ...state, image: 'Image is required!' }));
            isValid = false;
        }

        if (!isValid) return;

        setIsImageUploading(true);

        if (fileImage) {
            const reader = new FileReader();
            reader.readAsDataURL(fileImage); //base64-encoded format
            reader.onloadend = async () => {
                const base64Image = reader.result;

                try {
                    const res = await fetch('/api/upload-image', {
                        method: 'POST',
                        body: JSON.stringify({ file: base64Image }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.error);
                    }

                    imgUrl = data.url;

                    const adventure = {
                        title: enteredTitle,
                        image: imgUrl,
                        address: enteredAddress,
                        description: enteredDescription,
                        createdAt: new Date().toISOString()
                    };

                    setIsImageUploading(false);
                    setIsFormSubmitting(true);

                    await onAddAdventure(adventure);
                    setError({});
                    setIsFormSubmitting(false);

                } catch (error) {
                    console.log(error);
                    setError(state => ({ ...state, image: 'Image upload failed, please try later.' }));
                    setIsImageUploading(false);
                }
            };
        }
    }

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        ref={titleInputRef}
                        onFocus={() => setError(state => ({ ...state, title: '' }))}
                    />
                    {error.title && <p className={classes.error}>{error.title}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                        ref={imageInputRef}
                        onFocus={() => setError(state => ({ ...state, image: '' }))}
                    />
                    {error.image && <p className={classes.error}>{error.image}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        ref={addressInputRef}
                        onFocus={() => setError(state => ({ ...state, address: '' }))}
                    />
                    {error.address && <p className={classes.error}>{error.address}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        rows='5'
                        ref={descriptionInputRef}
                        onFocus={() => setError(state => ({ ...state, description: '' }))}
                    ></textarea>
                    {error.description && <p className={classes.error}>{error.description}</p>}
                </div>
                <div className={classes.actions}>
                    {/* TODO add loader */}
                    {isImageUploading && <span className={classes.loader}>Uploading image...</span>}
                    <button disabled={isImageUploading || isFormSubmitting}>Add Adventure</button>
                </div>
            </form>
        </div>
    );
}
