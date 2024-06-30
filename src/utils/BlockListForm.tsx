import React, { useState } from 'react';
import "./BlockListForm.css"

interface BlockListFormProps {
  onAdd: (url: string) => void;
  onCancel: () => void;
}


import { addToBlocklist } from "./storage";


const BlockListForm: React.FC<BlockListFormProps> = ({ onAdd, onCancel }) => {
  const [url, setUrl] = useState('');
  const extractDomain = (url: string): string => {
   
    let trimmedUrl = url.startsWith('https://') ? url.slice(8) : (url.startsWith('http://') ? url.slice(7) : url);  
    const slashIndex = trimmedUrl.indexOf('/');
    if (slashIndex !== -1) {
      trimmedUrl = trimmedUrl.slice(0, slashIndex);
    }
    const dotComIndex = trimmedUrl.indexOf('.com');
    if (dotComIndex !== -1) {
      trimmedUrl = trimmedUrl.slice(0, dotComIndex + 4);
    }
  
    return trimmedUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed_url=extractDomain(url);
    if (trimmed_url) {
      await addToBlocklist(trimmed_url.toLowerCase());
      setUrl("");
      alert("URL added to blocklist!");
    }

    onAdd(trimmed_url);
    setUrl('');
  };


  const handleCancelClick = () => {
    onCancel();
    setUrl('');
  };

  return (
    <div className="blocklist-form-modal">
      <div className="blocklist-form">
        <input
          type="text"
          placeholder="Type website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default BlockListForm;
