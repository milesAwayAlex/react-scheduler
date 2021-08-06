import { useState } from 'react';

export default (md) => {
  const [mode, setMode] = useState(md);
  const [hist, setHist] = useState([md]);
  const transition = (newMd, hop = false) => {
    if (hop) setHist((hist) => hist.slice(0, -1));
    setHist((hist) => [...hist, newMd]);
    setMode(newMd);
  };
  const back = () => {
    if (hist.length < 2) return;
    setMode(hist[hist.length - 2]);
    setHist(hist.slice(0, -1));
  };
  return { mode, transition, back };
};
