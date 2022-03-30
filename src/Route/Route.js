import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import Video from "../Component/Video";

const Routes1 = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/register" element={<Register />} /> */}
        <Route path="/" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes1;
