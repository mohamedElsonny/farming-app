import { z } from 'zod';

export const SendOfferDtoSchema = z.object({
  processId: z.number({ required_error: 'process id is required' }),
  conditions: z
    .array(
      z.object({
        description: z
          .string({ required_error: 'description is required' })
          .min(1, 'Cannot be empty'),
        type: z.enum(['Demand', 'Benefit']),
      }),
    )
    .min(2, { message: 'You have to specify a demand and a benefit' }),
});

export type SendOfferDto = z.infer<typeof SendOfferDtoSchema>;
