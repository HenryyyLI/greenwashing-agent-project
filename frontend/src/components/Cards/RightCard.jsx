import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import useContext from '../../zustand/useContext';
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RightCard = () => {
    const data = useContext((state) => state.data);
    const newData = useContext((state) => state.newData);
    const [cardPage, setCardPage] = useState(0);

    const getRiskClass = (risk) => {
        switch (risk) {
            case "red":
                return "bg-red-100 text-red-800";
            case "yellow":
                return "bg-yellow-100 text-yellow-800";
            case "blue":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getHighlightedClaims = (text, highlights) => {
        if (!text) return text;

        const sorted = [...highlights].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));

        const elements = [];
        let lastIndex = 0;

        sorted.forEach((highlight, idx) => {
            const startIndex = text.indexOf(highlight.text, lastIndex);
            if (startIndex === -1) return;

            const endIndex = startIndex + highlight.text.length;

            if (startIndex > lastIndex) {
                elements.push(<span key={`plain-${idx}`}>{text.slice(lastIndex, startIndex)}</span>);
            }

            elements.push(
                <Tooltip key={`highlight-${idx}`}>
                    <TooltipTrigger asChild>
                        <span className={`${getRiskClass(highlight.risk)} px-1 rounded-sm cursor-help break-words inline`}>
                            {highlight.text}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm text-sm">
                        <p><strong>Reason:</strong> {highlight.reason}</p>
                        <p><strong>Evidence:</strong> {highlight.evidence}</p>
                        <p><strong>Page:</strong> {highlight.page}</p>
                    </TooltipContent>
                </Tooltip>
            );

            lastIndex = endIndex;
        });

        if (lastIndex < text.length) {
            elements.push(<span key="final">{text.slice(lastIndex)}</span>);
        }

        return <>{elements}</>;
    };

    const getRevisedHighlight = (text, changedParts) => {
        if (!text) return text;

        const sorted = [...changedParts].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));
        const elements = [];
        let lastIndex = 0;

        sorted.forEach((part, idx) => {
            const startIndex = text.indexOf(part.text, lastIndex);
            if (startIndex === -1) return;

            const endIndex = startIndex + part.text.length;

            if (startIndex > lastIndex) {
                elements.push(<span key={`plain-${idx}`}>{text.slice(lastIndex, startIndex)}</span>);
            }

            elements.push(
                <span key={`change-${idx}`} className="bg-yellow-200 px-1 rounded-sm">
                    {part.text}
                </span>
            );

            lastIndex = endIndex;
        });

        if (lastIndex < text.length) {
            elements.push(<span key="final">{text.slice(lastIndex)}</span>);
        }

        return <>{elements}</>;
    };

    const renderRightCardContent = () => {
        if (cardPage === 0) {
            return (
                <>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Detected Greenwashing</h2>
                    {data ? (
                        <TooltipProvider>
                            <pre className="mt-[10px] max-h-[475px] overflow-auto text-base font-normal tracking-tight leading-relaxed whitespace-pre-wrap">
                                {getHighlightedClaims(data.documentText, data.highlights)}
                            </pre>
                        </TooltipProvider>
                    ) : (
                            <div className="flex h-full justify-center items-center">
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">😢 Loading or no data available</h4>
                            </div>
                        )}
                </>
            );
        } else {
            return (
                <>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Refined Text</h2>
                    {data ? (
                        <TooltipProvider>
                            <pre className="mt-[10px] max-h-[475px] overflow-auto text-base font-normal tracking-tight leading-relaxed whitespace-pre-wrap">
                                {getRevisedHighlight(newData?.revised, newData?.changedParts)}
                            </pre>
                        </TooltipProvider>
                    ) : (
                            <div className="flex h-full justify-center items-center">
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">😢 Loading or no data available</h4>
                            </div>
                        )}
                </>
            );
        }
    }

    return (
        <Card className="relative bg-white p-6 flex-1 flex flex-col gap-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={cardPage}
                    initial={{ opacity: 0, x: cardPage === 1 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: cardPage === 1 ? -100 : 100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col"
                >
                    {renderRightCardContent(cardPage)}
                </motion.div>
            </AnimatePresence>
            {cardPage === 0 && (
                <button
                    onClick={() => setCardPage(1)}
                    className="absolute top-1/2 right-[-30px] -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 transition shadow-lg rounded-full w-[60px] h-[60px] flex items-center justify-center z-10"
                    title="Next"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {cardPage === 1 && (
                <button
                    onClick={() => setCardPage(0)}
                    className="absolute top-1/2 left-[-30px] -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 transition shadow-lg rounded-full w-[60px] h-[60px] flex items-center justify-center z-10"
                    title="Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
        </Card>
    )
}

export default RightCard
