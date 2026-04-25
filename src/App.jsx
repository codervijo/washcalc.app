import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import PricingGuide from "./pages/PricingGuide.jsx";
import NotFound from "./pages/NotFound.jsx";
import { DRIVEWAY, ROOF, HOUSE_WASHING, DECK } from "./pages/variants.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/calculators/driveway" element={<CalculatorPage preset={DRIVEWAY} />} />
      <Route path="/calculators/roof" element={<CalculatorPage preset={ROOF} />} />
      <Route path="/calculators/house-washing" element={<CalculatorPage preset={HOUSE_WASHING} />} />
      <Route path="/calculators/deck" element={<CalculatorPage preset={DECK} />} />
      <Route path="/pressure-washing-pricing-guide" element={<PricingGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
