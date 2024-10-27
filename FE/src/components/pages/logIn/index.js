import { fetchUserApi } from 'api/auth';
import Button from 'components/commonComponents/button';
import InputWithValidation from 'components/commonComponents/inputWithValidation';
import { useState } from 'react';

const LogIn = () => {
  const [url, setUrl] = useState('http://localhost:3006/users');
  const handleSubmit = () => {
    fetchUserApi(url);
  };

  return (
    <div className="max-w-screen-md mx-auto mt-10 flex flex-col align-center">
      <InputWithValidation
        label="Url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="ur"
        errorMessage="err"
        tooltipText="tool"
      />

      <Button onClick={handleSubmit} type="submit" disabled={false}>
        "Request"
      </Button>
    </div>
  );
};

export default LogIn;
