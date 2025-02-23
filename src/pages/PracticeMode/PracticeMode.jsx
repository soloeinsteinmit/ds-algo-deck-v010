/**
 * @fileoverview Lo and behold! The Practice Mode page, where brave souls
 * may test their mettle against algorithmic challenges and puzzles.
 */

import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/**
 * @component PracticeMode
 * @description A sacred arena where users may hone their skills
 * through practical exercises and coding challenges.
 */
const PracticeMode = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Practice Mode 🧑‍💻</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:scale-105 transition-transform">
          <CardHeader className="font-bold text-xl">Coding Challenges 🎯</CardHeader>
          <CardBody>
            <p>Test thy might against curated programming challenges.</p>
          </CardBody>
        </Card>
        
        <Card className="hover:scale-105 transition-transform">
          <CardHeader className="font-bold text-xl">Progress Tracking 📊</CardHeader>
          <CardBody>
            <p>Monitor thy journey and celebrate thy victories.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PracticeMode;
