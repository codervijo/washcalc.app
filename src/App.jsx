import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import HouseWashingPage from "./pages/HouseWashingPage.jsx";
import DeckPage from "./pages/DeckPage.jsx";
import PricingGuide from "./pages/PricingGuide.jsx";
import QuoteTool from "./pages/QuoteTool.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import CalculatorDepth from "./components/CalculatorDepth.jsx";
import RoofCostLinks from "./components/RoofCostLinks.jsx";
import EstimateCalculator from "./pages/EstimateCalculator.jsx";
import RoofCleaningCost from "./pages/RoofCleaningCost.jsx";
import DrivewayPressureWashingCost from "./pages/DrivewayPressureWashingCost.jsx";
import HouseWashingCost from "./pages/HouseWashingCost.jsx";
import QuoteTemplate from "./pages/QuoteTemplate.jsx";
import EstimateTemplate from "./pages/EstimateTemplate.jsx";
import { DRIVEWAY, ROOF } from "./pages/variants.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* /calculator carries the Phase 1.B depth block. It is passed HERE and
          not inside CalculatorPage so the surface-variant routes below — one
          of which (/calculators/driveway) is indexed — render unchanged. */}
      <Route path="/calculator" element={<CalculatorPage belowHero={<CalculatorDepth />} />} />
      <Route path="/calculators/driveway" element={<CalculatorPage preset={DRIVEWAY} />} />
      <Route path="/calculators/roof" element={<CalculatorPage preset={ROOF} belowHero={<RoofCostLinks />} />} />
      <Route path="/calculators/house-washing" element={<HouseWashingPage />} />
      <Route path="/calculators/deck" element={<DeckPage />} />

      <Route path="/pressure-washing-pricing-guide" element={<PricingGuide />} />
      <Route path="/quote-tool" element={<QuoteTool />} />
      <Route path="/about" element={<About />} />

      {/* ── Phase 1.B — search-demand pages ──────────────────────────── */}
      <Route path="/pressure-washing-estimate-calculator" element={<EstimateCalculator />} />
      <Route path="/roof-cleaning-cost" element={<RoofCleaningCost />} />
      <Route path="/driveway-pressure-washing-cost" element={<DrivewayPressureWashingCost />} />
      <Route path="/house-washing-cost" element={<HouseWashingCost />} />
      <Route path="/pressure-washing-quote-template" element={<QuoteTemplate />} />
      <Route path="/pressure-washing-estimate-template" element={<EstimateTemplate />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
