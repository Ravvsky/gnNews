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
    <button
      onClick={switchHandler}
      className="flex items-center"
      data-testid="view-switcher"
    >
      <span className="material-icons hover:text-green-900 transition-colors ease-in duration-75">
        {icon}
      </span>
    </button>
  );
};

export default ViewSwitcher;
