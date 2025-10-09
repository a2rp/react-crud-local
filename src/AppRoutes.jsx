import React, { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

/* =========================================================
   Pages (lazy where it matters)
   ========================================================= */
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));

const NotFound = lazy(() => import("./pages/notFound"));


/* =========================================================
   Component
   ========================================================= */
const AppRoutes = () => {
    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        width: "100%",
                        height: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            <Routes>
                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Core */}
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About title="About" note="Project overview and notes" />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound title="Not Found" note="This route is not configured yet." />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
