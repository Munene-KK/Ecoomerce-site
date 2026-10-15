import { useEffect } from "react";

const UseTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Masoko`;
  }, [title]);
};

export default UseTitle;
