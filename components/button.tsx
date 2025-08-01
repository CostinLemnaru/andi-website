"use client"

import { motion } from "framer-motion";

interface ButtonData {
  id: number;
  Text: string;
  Url: string;
}

interface ButtonSectionData {
  __component: string;
  id: number;
  Title: string;
  Button: ButtonData;
}

interface ButtonSectionProps {
  data: ButtonSectionData;
}

export default function Button({ data }: ButtonSectionProps) {
  if (!data) return null;

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.Title && (
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
              {data.Title}
            </h2>
          )}

          {data.Button && (
            <motion.a
              href={data.Button.Url}
              className="inline-block px-6 py-3 font-medium rounded-lg transition shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {data.Button.Text}
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
