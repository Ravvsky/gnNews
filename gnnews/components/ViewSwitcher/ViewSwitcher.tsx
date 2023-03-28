import "material-icons/iconfont/material-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "@/store/reducers";
const ViewSwitcher = () => {
  const dispatch = useDispatch();
  const icon = useSelector((state: { view: string }) => state.view);

  const switchHandler = () => {
    dispatch(setView());
  };

  return (
    <button onClick={switchHandler} className="flex items-center">
      <span className="material-icons">{icon}</span>
    </button>
  );
};

export default ViewSwitcher;
