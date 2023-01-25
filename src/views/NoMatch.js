import { gaEvent } from '../helpers/gaHelper';
import SadPanda from '../components/SadPanda';

export default function NoMatch({uid}) {
  document.title = `Sad Panda - PackTrak`;

  const backURL = uid !== null && uid !== -1 ? '/incoming' : '/';

  const url = window.location.pathname;
  gaEvent('404_page', {path: url});

  return (
    <SadPanda reason="it can't find what you're looking for" backURL={backURL} />
  );
}
