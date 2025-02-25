import React from "react";
import styled from "styled-components";
import { TbHierarchy3 } from "react-icons/tb";

const FeaturesCard = ({
  icon = <TbHierarchy3 />,
  title = "Data Structures Visualizer",
  description = "Explore various data structures with interative visualisations.",
}) => {
  return (
    <StyledWrapper>
      <section className="container">
        <div className="card">
          <div className="content">
            <p className="logo">{icon}</p>
            <div className="h6">{title}</div>
            <div className="hover_content">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </section>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 32em;
    max-width: 80%;
    padding: 2em 0;
    background: hsl(var(--nextui-content2));
    box-shadow: 0 0 6px 0 rgba(32, 32, 36, 0.12);
    transition: all 0.35s ease;
  }

  .card::before,
  .card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: hsl(var(--nextui-warning));
    height: 4px;
  }

  .card::before {
    width: 0;
    opacity: 0;
    transition: opacity 0 ease, width 0 ease;
    transition-delay: 0.5s;
  }

  .card::after {
    width: 100%;
    background: white;
    transition: width 0.5s ease;
  }

  .card .content {
    width: 22em;
    max-width: 80%;
  }

  .card .logo {
    margin: 0 0 1em;
    width: 10.625em;
    font-size: 3.5em;
    color: hsl(var(--nextui-default-500));
    transition: all 0.35s ease;
  }

  .card .h6 {
    color: hsl(var(--nextui-default-900));
    font-weight: 600;
    font-size: 1.5em;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 2px;
  }

  .card .hover_content {
    overflow: hidden;
    max-height: 0;
    transform: translateY(1em);
    transition: all 0.55s ease;
    font-size: 1.155em;
  }

  .card .hover_content p {
    margin: 1.5em 0 0;
    color: hsl(var(--nextui-default-500));
    line-height: 1.4em;
  }

  .card:hover {
    width: 35em;
    box-shadow: 0 10px 20px 0 rgba(32, 32, 36, 0.12);
  }

  .card:hover::before {
    width: 100%;
    opacity: 1;
    transition: opacity 0.5s ease, width 0.5s ease;
    transition-delay: 0;
  }

  .card:hover::after {
    width: 0;
    opacity: 0;
    transition: width 0 ease;
  }

  .card:hover .logo {
    margin-bottom: 0.5em;
  }

  .card:hover .hover_content {
    max-height: 10em;
    transform: none;
  }
`;

export default FeaturesCard;
