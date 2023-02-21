import { useEffect, useState } from 'react';

const useDocumentTitle = title => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useEffect(() => {
    if (!documentTitle || documentTitle === '') {
      document.title = 'PackTrak';
    } else {
      document.title = `${documentTitle} - PackTrak`;
    }
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle];
}

export {useDocumentTitle};
