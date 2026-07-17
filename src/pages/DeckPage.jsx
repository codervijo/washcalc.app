import CalculatorPage from "./CalculatorPage.jsx";
import DeckMaterialSelector from "../components/tools/DeckMaterialSelector.jsx";
import DeckTools from "../components/tools/DeckTools.jsx";
import { DECK } from "./variants.js";

// /calculators/deck — the primary calculator stays the above-fold hero. The
// material selector sits in the hero (it feeds a price multiplier + PSI warning
// into the calculator); stain/seal + clean-and-seal timeline render below.
export default function DeckPage() {
  return (
    <CalculatorPage
      preset={DECK}
      heroExtra={({ values, setValues }) => (
        <DeckMaterialSelector values={values} setValues={setValues} />
      )}
      belowHero={<DeckTools />}
    />
  );
}
