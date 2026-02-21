import type { Route } from './+types/webhooks.paystack'
import { supabaseAdmin } from '../../lib/supabase.server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function action({ request }: Route.ActionArgs) {
  console.log({ request })

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const payload = await request.json()

    // We only care about successful charges (or subscription creations)
    if (payload.event === 'charge.success') {
      const data = payload.data
      const customerEmail = data.customer?.email

      // Extract affiliate_link_id from Paystack's custom_fields metadata
      const customFields = data.metadata?.custom_fields || []
      const affiliateField = customFields.find(
        (f: any) => f.variable_name === 'affiliate_link_id',
      )
      const affiliateLinkId = affiliateField?.value

      // If no affiliate ID was passed, just return 200 OK (normal non-affiliate sale)
      if (!affiliateLinkId) {
        return new Response('Processing complete (No affiliate data)', {
          status: 200,
          headers: corsHeaders,
        })
      }

      // ... rest of logic
      // 1. Fetch the link and product to get the payout amount
      const { data: link, error: linkError } = await supabaseAdmin
        .from('affiliate_links')
        .select('id, product_id, product:products(payout_per_conversion)')
        .eq('id', affiliateLinkId)
        .single()

      if (linkError || !link) {
        console.error(
          'Webhook Error: Invalid affiliate link ID',
          affiliateLinkId,
        )
        return new Response('Invalid affiliate link', {
          status: 400,
          headers: corsHeaders,
        })
      }

      // Supabase types might infer relation as array or single object
      const productData = Array.isArray(link.product)
        ? link.product[0]
        : link.product
      const payoutAmount = productData?.payout_per_conversion || 0

      // 2. Idempotency Check (Ensure we only reward once per subscriber)
      const { data: existingConversions } = await supabaseAdmin
        .from('conversions')
        .select('id')
        .eq('affiliate_link_id', affiliateLinkId)
        .eq('end_user_identifier', customerEmail)

      if (existingConversions && existingConversions.length > 0) {
        return new Response('Conversion already acknowledged for this user', {
          status: 200,
          headers: corsHeaders,
        })
      }

      // 3. Insert the conversion!
      const { error: insertError } = await supabaseAdmin
        .from('conversions')
        .insert([
          {
            affiliate_link_id: affiliateLinkId,
            product_id: link.product_id,
            end_user_identifier: customerEmail,
            payout_amount: payoutAmount,
            status: 'approved',
          },
        ])

      if (insertError) {
        console.error('Webhook Error: Failed to insert conversion', insertError)
        return new Response('Database error', {
          status: 500,
          headers: corsHeaders,
        })
      }

      return new Response('Conversion verified and wallet updated', {
        status: 200,
        headers: corsHeaders,
      })
    }

    // Acknowledge other events without processing
    return new Response('Event ignored', { status: 200, headers: corsHeaders })
  } catch (err) {
    console.error('Webhook Error:', err)
    return new Response('Internal Server Error', {
      status: 500,
      headers: corsHeaders,
    })
  }
}

// React Router automatically matches OPTIONS to a loader or action if not handled,
// but it's best practice to explicitly export a loader for OPTIONS if action strictly filters POST
export async function loader({ request }: Route.LoaderArgs) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }
  return new Response('Method Not Allowed', {
    status: 405,
    headers: corsHeaders,
  })
}
