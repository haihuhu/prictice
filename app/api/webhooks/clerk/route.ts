import { db } from '@/db';
import { week10Day2Users } from '@/db/schema';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export const POST = async (request: NextRequest) => {
  try {
    const event = await verifyWebhook(request);

    const eventType = event.type;
    const eventData = event.data;

    if (eventType === 'user.created') {
      console.log('eventType:', eventType);
      console.log('clerkId:', eventData.id);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('clerk webhook error:', error);
    return Response.json({ error: 'Invalid webhook request' }, { status: 404 });
  }
};
