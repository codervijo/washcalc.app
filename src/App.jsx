import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import HouseWashingPage from "./pages/HouseWashingPage.jsx";
import DeckPage from "./pages/DeckPage.jsx";
import RoofPage from "./pages/RoofPage.jsx";
import DrivewayPage from "./pages/DrivewayPage.jsx";
import PricingGuide from "./pages/PricingGuide.jsx";
import QuoteTool from "./pages/QuoteTool.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import CalculatorDepth from "./components/CalculatorDepth.jsx";
import EstimateCalculator from "./pages/EstimateCalculator.jsx";
import RoofCleaningCost from "./pages/RoofCleaningCost.jsx";
import DrivewayPressureWashingCost from "./pages/DrivewayPressureWashingCost.jsx";
import HouseWashingCost from "./pages/HouseWashingCost.jsx";
import QuoteTemplate from "./pages/QuoteTemplate.jsx";
import EstimateTemplate from "./pages/EstimateTemplate.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* /calculator carries the v1.C depth block. It is passed HERE and
          not inside CalculatorPage so each surface-variant route below gets
          only its own route-scoped content. */}
      <Route path="/calculator" element={<CalculatorPage belowHero={<CalculatorDepth />} />} />
      <Route path="/calculators/driveway" element={<DrivewayPage />} />
      <Route path="/calculators/roof" element={<RoofPage />} />
      <Route path="/calculators/house-washing" element={<HouseWashingPage />} />
      <Route path="/calculators/deck" element={<DeckPage />} />

      <Route path="/pressure-washing-pricing-guide" element={<PricingGuide />} />
      <Route path="/quote-tool" element={<QuoteTool />} />
      <Route path="/about" element={<About />} />

      {/* ── v1.C — search-demand pages ──────────────────────────── */}
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
