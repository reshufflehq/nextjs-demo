import '@reshuffle/code-transform/macro';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

import { yay } from '../backend/foo';

const Page = ({ userAgent }) => {
  const [exposedRes, setExposedRes] = useState();
  useEffect(() => void yay().then(setExposedRes), [setExposedRes]);
  const [apiRes, setApiRes] = useState();
  useEffect(() => void fetch('/api/test')
    .then((res) => res.json())
    .then(({ result }) => setApiRes(result))
  , [setApiRes]);

  return (
    <>
      <Header />
      <main>
        <div>
          <h3>Server side rendering result</h3>
          Your user agent: {userAgent}
        </div>
        <div>
          <h3>Exposed function result</h3>
          Yay is: {exposedRes}
        </div>
        <div>
          <h3>API result</h3>
          {apiRes}
        </div>
        <div>
          <h3>Static pages work too</h3>
          <a href='/yay'>Try me</a>
        </div>
      </main>
    </>
  );
}

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Page
