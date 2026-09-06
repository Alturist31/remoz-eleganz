// 💡 THE IMPORT FIX: Pulling defineCollection directly from 'astro:content' to eliminate runtime function errors!
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import path from 'path';

export const collections = {
  'products': defineCollection({
    loader: glob({ pattern: '**/*.md', base: path.join(process.cwd(), 'src/content/products') }),
    schema: z.object({
      title: z.string(),
      
      // Smart pre-processor handles both single string histories and array updates seamlessly
      category: z.preprocess((val) => {
        if (typeof val === 'string') return [val];
        if (Array.isArray(val)) return val;
        return [];
      }, z.array(z.string()).default([])),

      image: z.string().default('https://unsplash.com'),
      price: z.number().default(0),
      moq: z.number().default(1),
      colors: z.array(z.string()).default([]),
    }).passthrough(),
  }),
};
