import CalculatorPage from "./CalculatorPage.jsx";
import RoofPitchTool from "../components/tools/RoofPitchTool.jsx";
import RoofTools from "../components/tools/RoofTools.jsx";
import { ROOF } from "./variants.js";

// /calculators/roof — the primary calculator stays the above-fold hero. The
// pitch tool sits in the hero (it pushes true roof area into the calculator);
// roof pricing copy and the cost-guide cross-links render below.
export default function RoofPage() {
  return (
    <CalculatorPage
      preset={ROOF}
      heroExtra={({ values, setValues }) => (
        <RoofPitchTool values={values} setValues={setValues} />
      )}
      belowHero={<RoofTools />}
    />
  );
}
