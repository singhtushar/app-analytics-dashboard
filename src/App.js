import logo from "./logo.svg";
import "./App.css";
import AnalyticsDashboard from "./pages/AppAnalytics/components/AnalyticsDashboard";
import BarChart from "./components/barChart/BarChart";
import Select from "react-select";
import PieChart from "./components/pieChart/PieChart";
import { useCallback, useMemo, useState } from "react";

const CHART_TYPES = {
  PIE: "pie",
  BAR: "bar",
};

const CHART_TYPE_VS_COMPONENT = {
  [CHART_TYPES.PIE]: PieChart,
  [CHART_TYPES.BAR]: BarChart,
};

function App() {
  const [selectedOption, setSelectedOption] = useState(CHART_TYPES.BAR);

  const handleChange = useCallback(({ value }) => {
    setSelectedOption(value);
  }, []);

  const ChartToRender = CHART_TYPE_VS_COMPONENT[selectedOption];

  return (
    <div className="App">
      <AnalyticsDashboard />
      <h3>Select Chart Type</h3>
      <Select
        defaultValue={{ label: "Bar Chart", value: CHART_TYPES.BAR }}
        options={[
          { label: "Bar Chart", value: CHART_TYPES.BAR },
          { label: "Pie Chart", value: CHART_TYPES.PIE },
        ]}
        onChange={handleChange}
      />
      <ChartToRender />
    </div>
  );
}

export default App;
