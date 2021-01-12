import React from 'react';
import './FileData.scss'

const FileData = () => {
    return (
        <div className="file-upload-wrapper" data-text="Select your file!">
            <input name="fileData" type="file"/>
        </div>
    )
};

export default FileData;
