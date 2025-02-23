/**
 * @fileoverview Hark! Behold the Resources page, a grand repository of knowledge
 * where seekers of wisdom may find guidance in their quest to master
 * the arts of Data Structures and Algorithms.
 */

import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/**
 * @component Resources
 * @description A noble collection of learning materials and documentation
 * for those who wish to delve deeper into the mysteries of computing.
 */
const Resources = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Resources 📚</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:scale-105 transition-transform">
          <CardHeader className="font-bold text-xl">Documentation 📖</CardHeader>
          <CardBody>
            <p>Comprehensive guides and references for your learning journey.</p>
          </CardBody>
        </Card>
        
        <Card className="hover:scale-105 transition-transform">
          <CardHeader className="font-bold text-xl">Tutorials 🎓</CardHeader>
          <CardBody>
            <p>Step-by-step guides to master algorithms and data structures.</p>
          </CardBody>
        </Card>
        
        <Card className="hover:scale-105 transition-transform">
          <CardHeader className="font-bold text-xl">External Links 🔗</CardHeader>
          <CardBody>
            <p>Curated collection of helpful resources from across the realm.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
