"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqData } from "@/data/faq"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 md:py-24 bg-[var(--kreator-light-gray)]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--kreator-blue)] mb-3 sm:mb-4 font-[family-name:var(--font-poppins)]"
          >
            ¿Tienes dudas?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--kreator-dark-gray)] font-[family-name:var(--font-open-sans)]">
            Encuentra respuestas a las preguntas más frecuentes
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-base sm:text-lg md:text-xl font-semibold text-[var(--kreator-blue)] pr-3 sm:pr-4 font-[family-name:var(--font-poppins)] cursor-pointer">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 sm:w-6 h-5 sm:h-6 text-[var(--kreator-yellow)] flex-shrink-0 transition-transform duration-200 cursor-pointer ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 sm:pt-2">
                  <p className="text-sm sm:text-base md:text-lg text-[var(--kreator-dark-gray)] leading-relaxed font-[family-name:var(--font-open-sans)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="mailto:info@kreator.es"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-kreator-blue bg-[var(--kreator-yellow)] rounded-lg hover:bg-[var(--kreator-orange)] transition-colors duration-200 shadow-md hover:shadow-lg font-[family-name:var(--font-poppins)]"
            data-analytics="faq-contact-support"
            aria-label="Enviar correo al equipo de soporte de Kreator"
          >
            Contactar con soporte
          </a>
        </div>
      </div>
    </section>
  )
}
