import React from 'react';
import { Link } from 'react-router-dom';

const SongDisplay = ({ image, song }) => {
    const shareToSocialMedia = () => {
        const text = encodeURIComponent(song);
        const url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <h1>Your Generated Song</h1>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />
            <pre>{song}</pre>
            <Link to="/">
                <button>Upload Another Picture</button>
            </Link>
            <button onClick={shareToSocialMedia}>Share to Social Media</button>
        </div>
    );
};

export default SongDisplay;
