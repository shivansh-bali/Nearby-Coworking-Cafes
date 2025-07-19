import st from "./CafePanel.module.scss";
import Sidepanel from "../../../components/Cafe/Sidepanel/Sidepanel";
import CafeDashboard from "../Dashboard/CafeDashboard";

const CafePanel = () => {
  return (
    <div className={`${st.cafePanel}   d-flex gap-4 p-4 space-between`}>
      <Sidepanel />
      <CafeDashboard />
    </div>
  );
};

export default CafePanel;
