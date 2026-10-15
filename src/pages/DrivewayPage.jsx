import CalculatorPage from "./CalculatorPage.jsx";
import DrivewayAreaTool from "../components/tools/DrivewayAreaTool.jsx";
import DrivewayTools from "../components/tools/DrivewayTools.jsx";
import { DRIVEWAY } from "./variants.js";

// /calculators/driveway — the primary calculator stays the above-fold hero.
// The area tool sits in the hero (it pushes measured area into the
// calculator); driveway pricing copy and the cost-guide cross-links render
// below. Title, H1, intro and canonical are unchanged (indexed page).
export default function DrivewayPage() {
  return (
    <CalculatorPage
      preset={DRIVEWAY}
      heroExtra={({ values, setValues }) => (
        <DrivewayAreaTool values={values} setValues={setValues} />
      )}
      belowHero={<DrivewayTools />}
    />
  );
}
