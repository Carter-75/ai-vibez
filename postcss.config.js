import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [
    tailwindcss({
      config: './tailwind.config.ts'
    }),
  ],
};