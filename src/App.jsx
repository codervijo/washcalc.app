import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import HouseWashingPage from "./pages/HouseWashingPage.jsx";
import DeckPage from "./pages/DeckPage.jsx";
import PricingGuide from "./pages/PricingGuide.jsx";
import QuoteTool from "./pages/QuoteTool.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import { DRIVEWAY, ROOF } from "./pages/variants.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/calculators/driveway" element={<CalculatorPage preset={DRIVEWAY} />} />
      <Route path="/calculators/roof" element={<CalculatorPage preset={ROOF} />} />
      <Route path="/calculators/house-washing" element={<HouseWashingPage />} />
      <Route path="/calculators/deck" element={<DeckPage />} />
      <Route path="/pressure-washing-pricing-guide" element={<PricingGuide />} />
      <Route path="/quote-tool" element={<QuoteTool />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
