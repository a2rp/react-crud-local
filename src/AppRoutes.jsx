import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const NotFound = lazy(() => import("./pages/notFound"));

const PageLoader = () => <Box sx={{ width: "100%", minHeight: "45vh", display: "grid", placeItems: "center", color: "var(--accent)" }}><CircularProgress color="inherit" size={34} /></Box>;

const AppRoutes = () => {
    const { pathname } = useLocation();
    return (
        <Suspense key={pathname} fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About title="About" note="Project overview and notes" />} />
                <Route path="*" element={<NotFound title="Not Found" note="This route is not configured yet." />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
