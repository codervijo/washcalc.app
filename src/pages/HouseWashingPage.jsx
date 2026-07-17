import CalculatorPage from "./CalculatorPage.jsx";
import HouseWashingTools from "../components/tools/HouseWashingTools.jsx";
import { HOUSE_WASHING } from "./variants.js";

// /calculators/house-washing — the primary calculator stays the above-fold
// hero; SH dilution, job profitability, and the regional table render below.
export default function HouseWashingPage() {
  return <CalculatorPage preset={HOUSE_WASHING} belowHero={<HouseWashingTools />} />;
}
