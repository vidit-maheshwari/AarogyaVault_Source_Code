import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth, faCalendarCheck, faCoins } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          Our mission is to ensure that everyone has access to their complete medical history, enabling better healthcare decisions and continuity of care. We leverage the power of generative AI and blockchain technology to offer a seamless and secure way to manage medical records.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Decentralized Storage"
          description="Store your medical prescriptions securely using blockchain technology.
Ensure your medical records are safe, tamper-proof, and accessible anytime, anywhere."
          icon={faTruckMedical}
        />

        <InformationCard
          title="AI-Powered Prescription Understanding"
          description="Utilize OCR (Optical Character Recognition) technology to extract text from your prescriptions.
Our generative AI interprets the extracted text to provide detailed insights into your medical prescriptions.
Understand your prescriptions better with AI-powered explanations."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Personalized Medical Chatbot"
          description="Get answers to your medical queries instantly with our AI-powered chatbot.
The chatbot is trained to provide personalized responses based on your medical history and current health status.
Access reliable medical information and advice at your fingertips."
          icon={faTooth}
        />

        <InformationCard
          title="Doctor Appointment Booking System"
          description="Book appointments with doctors conveniently through our platform.
Browse doctor profiles, check availability, and schedule appointments effortlessly."
          icon={faCalendarCheck}
        />

        <InformationCard
          title="Crypto Payments"
          description="Pay for your doctor appointments securely using cryptocurrency.
Enjoy a seamless and modern payment experience with support for multiple cryptocurrencies."
          icon={faCoins}
        />
      </div>
    </div>
  );
}

export default Info;
