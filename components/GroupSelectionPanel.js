import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FileDisplay from "./FileDisplay";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const GroupSelectionPanel = ({ groupedFiles, onFileSelect }) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex h-full items-start justify-center overflow-auto p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold">Matter Intake</h1>
          <p className="text-lg text-muted-foreground">
            We automatically group your files by matter. Continue on to the
            matter hub.
          </p>
        </div>
        <motion.div className="space-y-4">
          {Object.entries(groupedFiles).map(([groupId, group], index) => (
            <motion.div
              key={groupId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FileDisplay
                files={group.files}
                name={group.name}
                summary={group.summary}
                onFileSelect={onFileSelect}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8">
          <Button onClick={handleContinue} className="w-full py-2 text-lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSelectionPanel;
