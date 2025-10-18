"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { faqData } from "@/data/faq"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface MarkdownProps {
  children: string
  components?: Components
  className?: string
}

export function Markdown({ children, components, className }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

export function FAQSection() {
  const markdownComponents: Components = {
    p: ({ children }) => (
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--kreator-dark-gray)]">{children}</p>
    ),
    strong: ({ children }) => <strong className="font-semibold text-black">{children}</strong>,
    li: ({ children }) => <li className="list-disc ml-5 text-[var(--kreator-dark-gray)]">{children}</li>,
  }

  return (
    <section
      id="faq"
      tabIndex={-1}
      aria-labelledby="faq-heading"
      className="py-12 sm:py-16 md:py-24 bg-[var(--kreator-light-gray)] scroll-mt-24 focus:outline-none"
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
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
            >
              <AccordionTrigger
                id={`faq-question-${index}`}
                className="text-base sm:text-lg md:text-xl font-semibold text-[var(--kreator-blue)] font-[family-name:var(--font-poppins)] px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 cursor-pointer flex items-center justify-between w-full text-left"
              >
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 sm:pt-2 font-[family-name:var(--font-open-sans)]">
                <Markdown
                  components={markdownComponents}
                  className="markdown-content prose-sm sm:prose-base md:prose-lg max-w-none text-[var(--kreator-dark-gray)]"
                >
                  {item.answer}
                </Markdown>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Summary */}
        <div role="note" className="mt-5 text-[var(--kreator-dark-gray)] font-[family-name:var(--font-open-sans)]">
          <p aria-label="Resumen del funcionamiento de Kreator">
            <span aria-hidden="true">🔷</span> En resumen: <strong>Kreator</strong> no es solo una red de contactos,
            sino una <strong>comunidad empresarial colaborativa</strong>. Cada miembro aporta oportunidades,
            conocimiento y confianza. El resultado: más negocio para todos, menos esfuerzo individual y una red
            profesional sólida y activa.
          </p>
        </div>

        {/* CTA */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          ¿Aún tienes dudas? Ponte en contacto con nuestro equipo.
        </p>

        <div className="text-center mt-3 sm:mt-5">
          <a
            href="mailto:info@kreator.es"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-kreator-blue bg-[var(--kreator-yellow)] rounded-lg hover:bg-[var(--kreator-orange)] transition-colors duration-200 shadow-md hover:shadow-lg font-[family-name:var(--font-poppins)]"
            data-analytics="faq-contact-support"
            aria-label="Enviar correo al equipo de soporte de Kreator para resolver dudas"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
